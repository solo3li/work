from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from accounts import api as accounts_api
from shop import api as shop_api

api_patterns = [
    # Accounts
    path('accounts/register/', accounts_api.RegisterView.as_view(), name='api_register'),
    path('accounts/verify-email/<int:user_id>/', accounts_api.VerifyEmailView.as_view(), name='api_verify_email'),
    path('accounts/login/', accounts_api.LoginView.as_view(), name='api_login'),
    path('accounts/verify-2fa/<int:user_id>/', accounts_api.Verify2FAView.as_view(), name='api_verify_2fa'),
    
    # Shop
    path('shop/categories/', shop_api.CategoryListView.as_view(), name='api_categories'),
    path('shop/products/', shop_api.ProductListView.as_view(), name='api_products'),
    path('shop/products/<slug:slug>/', shop_api.ProductDetailView.as_view(), name='api_product_detail'),
    path('shop/orders/', shop_api.OrderListView.as_view(), name='api_orders'),
    path('shop/orders/create/', shop_api.OrderCreateView.as_view(), name='api_order_create'),
    path('shop/orders/<int:pk>/', shop_api.OrderDetailView.as_view(), name='api_order_detail'),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('', include('shop.urls')),
    path('api/', include(api_patterns)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
