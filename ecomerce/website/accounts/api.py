from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from .models import User
from .serializers import UserSerializer, RegisterSerializer, VerifySerializer

def send_verification_email(user, code, subject_template, html_template):
    subject = subject_template
    html_content = render_to_string(html_template, {'code': code})
    text_content = strip_tags(html_content)
    email_msg = EmailMultiAlternatives(subject, text_content, settings.DEFAULT_FROM_EMAIL, [user.email])
    email_msg.attach_alternative(html_content, "text/html")
    email_msg.send()

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            code = user.generate_verification_code()
            send_verification_email(user, code, 'Verify your LCWIKI account', 'emails/verification_email.html')
            return Response({'user_id': user.id, 'message': 'Verification code sent to email.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyEmailView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request, user_id):
        serializer = VerifySerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = User.objects.get(id=user_id)
                if user.email_verification_code == serializer.validated_data['code']:
                    user.is_email_verified = True
                    user.email_verification_code = None
                    user.save()
                    return Response({'message': 'Email verified successfully.'})
                return Response({'error': 'Invalid code.'}, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user:
            if not user.is_email_verified:
                code = user.generate_verification_code()
                send_verification_email(user, code, 'Verify your LCWIKI account', 'emails/verification_email.html')
                return Response({'user_id': user.id, 'require_verification': True}, status=status.HTTP_403_FORBIDDEN)
            
            if user.is_2fa_enabled:
                code = user.generate_2fa_code()
                send_verification_email(user, code, 'LCWIKI Login 2FA Code', 'emails/2fa_email.html')
                return Response({'user_id': user.id, 'require_2fa': True}, status=status.HTTP_403_FORBIDDEN)
            
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            })
        return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

class Verify2FAView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request, user_id):
        serializer = VerifySerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = User.objects.get(id=user_id)
                if user.two_factor_code == serializer.validated_data['code']:
                    user.two_factor_code = None
                    user.save()
                    refresh = RefreshToken.for_user(user)
                    return Response({
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                        'user': UserSerializer(user).data
                    })
                return Response({'error': 'Invalid 2FA code.'}, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
