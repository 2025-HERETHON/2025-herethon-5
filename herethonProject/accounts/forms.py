from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import CustomUser

# 로그인 폼
class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ['name', 'username', 'password1', 'password2']

    def clean_password1(self):
        password1 = self.cleaned_data.get("password1")
        if len(password1) < 8 :
            raise forms.ValidationError("비밀번호는 8자리 이상이어야 합니다.")
        flag = False
        for char in password1:
            if char.isalpha():
                flag = True
                break;
        if not flag :
            raise forms.ValidationError("비밀번호에 영문자가 하나 이상 포함되어야 합니다.")
        return password1

    
    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2 :
            raise forms.ValidationError("비밀번호가 일치하지 않습니다.")
        return password2
    

# 로그인 상태 체크 폼
class LoginForm(AuthenticationForm):
    remember_me = forms.BooleanField(required=False, label='로그인 상태 유지')