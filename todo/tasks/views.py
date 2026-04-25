import random
import string
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from .models import Task, Category, Subtask, Profile
from django.http import JsonResponse
from django.db.models import Q
from django.contrib import messages

def generate_code():
    return ''.join(random.choices(string.digits, k=6))

def send_funny_email(subject, title, message, to_email, code=None):
    html_content = render_to_string('emails/funny_email.html', {
        'title': title,
        'message': message,
        'code': code
    })
    text_content = strip_tags(html_content)
    
    email = EmailMultiAlternatives(subject, text_content, settings.EMAIL_HOST_USER, [to_email])
    email.attach_alternative(html_content, "text/html")
    email.send()

def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        user, created = User.objects.get_or_create(email=email, defaults={'username': email})
        
        profile, _ = Profile.objects.get_or_create(user=user)
        code = generate_code()
        profile.verification_code = code
        profile.save()
        
        try:
            send_funny_email(
                'Your Funny Todo Magic Code ✨',
                'Stop Right There!',
                'We found your magic code. Use it wisely, or the procrastination demons will find you!',
                email,
                code=code
            )
            request.session['auth_email'] = email
            return redirect('verify')
        except Exception as e:
            messages.error(request, f"The pigeon failed to deliver the mail: {e}")
            return render(request, 'tasks/login.html')
    return render(request, 'tasks/login.html')

def verify_view(request):
    email = request.session.get('auth_email')
    if not email:
        return redirect('login')
    
    if request.method == 'POST':
        code = request.POST.get('code')
        try:
            user = User.objects.get(email=email)
            profile = user.profile
            if profile.verification_code == code:
                profile.is_verified = True
                profile.save()
                login(request, user)
                return redirect('task_list')
            else:
                return render(request, 'tasks/verify.html', {'error': 'Wrong code! The monsters are laughing at you.'})
        except User.DoesNotExist:
            return redirect('login')
    return render(request, 'tasks/verify.html')

@login_required
def task_list(request):
    query = request.GET.get('q', '')
    category_id = request.GET.get('category', '')
    
    tasks = Task.objects.filter(user=request.user)
    if query:
        tasks = tasks.filter(Q(title__icontains=query) | Q(description__icontains=query))
    if category_id:
        tasks = tasks.filter(category_id=category_id)
        
    categories = Category.objects.filter(user=request.user)
    return render(request, 'tasks/task_list.html', {
        'tasks': tasks,
        'categories': categories,
        'query': query,
    })

@login_required
def add_task(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        description = request.POST.get('description')
        priority = request.POST.get('priority')
        due_date = request.POST.get('due_date') or None
        category_id = request.POST.get('category')
        
        category = None
        if category_id:
            category = Category.objects.filter(id=category_id, user=request.user).first()
            
        Task.objects.create(
            user=request.user,
            title=title,
            description=description,
            priority=priority,
            due_date=due_date,
            category=category
        )
        
        send_funny_email(
            'A New Burden Arrives! 📦',
            'New Task Summoned!',
            f'You just created "{title}". May God have mercy on your free time.',
            request.user.email
        )
        
        messages.success(request, "Task summoned successfully! 🪄")
        return redirect('task_list')
    categories = Category.objects.filter(user=request.user)
    return render(request, 'tasks/add_task.html', {'categories': categories})

@login_required
def toggle_task(request, task_id):
    task = get_object_or_404(Task, id=task_id, user=request.user)
    task.completed = not task.completed
    task.save()
    
    if task.completed:
        send_funny_email(
            'Victory is Yours! 🏆',
            'Task Defeated!',
            f'You actually finished "{task.title}"! We are all shocked and proud.',
            request.user.email
        )
    
    return redirect('task_list')

@login_required
def delete_task(request, task_id):
    task = get_object_or_404(Task, id=task_id, user=request.user)
    task_title = task.title
    task.delete()
    
    send_funny_email(
        'Evidence Destroyed! 📄🔥',
        'Task Disintegrated!',
        f'The task "{task_title}" has been deleted. If anyone asks, it never existed.',
        request.user.email
    )
    
    messages.info(request, "Task deleted. It's in a better place now. ☁️")
    return redirect('task_list')

@login_required
def logout_user(request):
    logout(request)
    return redirect('login')

@login_required
def reorder_tasks(request):
    if request.method == 'POST':
        order_list = request.POST.getlist('task_order[]')
        for index, task_id in enumerate(order_list):
            Task.objects.filter(id=task_id, user=request.user).update(order=index)
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'fail'}, status=400)
