from django.shortcuts import render, get_object_or_404, redirect
from .models import Category, Product, Order, OrderItem
from django.contrib.auth.decorators import login_required

def product_list(request, category_slug=None):
    category = None
    categories = Category.objects.all()
    products = Product.objects.filter(available=True)
    if category_slug:
        category = get_object_or_404(Category, slug=category_slug)
        products = products.filter(category=category)
    return render(request, 'shop/product_list.html', {
        'category': category,
        'categories': categories,
        'products': products
    })

def product_detail(request, slug):
    product = get_object_or_404(Product, slug=slug, available=True)
    return render(request, 'shop/product_detail.html', {'product': product})

@login_required
def cart_add(request, product_id):
    cart = request.session.get('cart', {})
    product_id_str = str(product_id)
    if product_id_str in cart:
        cart[product_id_str]['quantity'] += 1
    else:
        product = get_object_or_404(Product, id=product_id)
        cart[product_id_str] = {
            'price': str(product.price),
            'quantity': 1,
            'name': product.name
        }
    request.session['cart'] = cart
    return redirect('cart_detail')

def cart_detail(request):
    cart = request.session.get('cart', {})
    total_price = 0
    items = []
    for pid, item in cart.items():
        price = float(item['price'])
        quantity = int(item['quantity'])
        item_total = price * quantity
        total_price += item_total
        items.append({
            'product_id': pid,
            'name': item['name'],
            'price': price,
            'quantity': quantity,
            'total': item_total
        })
    return render(request, 'shop/cart_detail.html', {'items': items, 'total_price': total_price})

@login_required
def cart_remove(request, product_id):
    cart = request.session.get('cart', {})
    product_id_str = str(product_id)
    if product_id_str in cart:
        del cart[product_id_str]
        request.session['cart'] = cart
    return redirect('cart_detail')

@login_required
def order_create(request):
    cart = request.session.get('cart', {})
    if request.method == 'POST':
        order = Order.objects.create(
            user=request.user,
            first_name=request.POST.get('first_name'),
            last_name=request.POST.get('last_name'),
            email=request.user.email,
            address=request.POST.get('address'),
            postal_code=request.POST.get('postal_code'),
            city=request.POST.get('city'),
        )
        for pid, item in cart.items():
            product = Product.objects.get(id=pid)
            OrderItem.objects.create(
                order=order,
                product=product,
                price=item['price'],
                quantity=item['quantity']
            )
        request.session['cart'] = {}
        return render(request, 'shop/order_created.html', {'order': order})
    return render(request, 'shop/order_create.html', {'cart': cart})

@login_required
def order_list(request):
    orders = Order.objects.filter(user=request.user).order_by('-created')
    return render(request, 'shop/order_list.html', {'orders': orders})

@login_required
def order_detail(request, order_id):
    order = get_object_or_404(Order, id=order_id, user=request.user)
    
    # Status to Int for Stepper Logic
    status_map = {
        'pending': 1,
        'processing': 2,
        'shipped': 3,
        'delivered': 4
    }
    current_step = status_map.get(order.status, 1)
    
    return render(request, 'shop/order_detail.html', {
        'order': order,
        'current_step': current_step
    })
