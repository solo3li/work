import smtplib
import os
from dotenv import load_dotenv

load_dotenv()

host = "smtp.gmail.com"
port = 587
user = os.getenv('EMAIL_HOST_USER')
password = os.getenv('EMAIL_HOST_PASSWORD')

print(f"Testing with User: {user}")
print(f"Password Length: {len(password)}")

try:
    server = smtplib.SMTP(host, port)
    server.set_debuglevel(1)
    server.starttls()
    server.login(user, password)
    print("SUCCESS: Login worked!")
    server.quit()
except Exception as e:
    print(f"FAILURE: {e}")
