from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

# user
class CustomUser(AbstractUser):
    name = models.CharField(max_length=20, verbose_name="실명")
    def __str__(self):
        return self.username
    
# 마이페이지 - 나의 학습
class LearningRecord(models.Model):
    CATEGORY_CHOICES = [
        ('concept', '개념'),
        ('event', '사건'),
        ('person', '인물'),
        ('history', '역사'),
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="사용자")
    content_title = models.CharField(max_length=128, verbose_name="학습 내용")
    # content_title = models.ForeignKey(Learn 모델, on_delete=models.CASCADE) -> 학습 정해지면 이걸로 변경
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="최초 학습일")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="마지막 학습일")
    
    class Meta:
        unique_together = ('user', 'content_title', 'category')
        ordering = ['-updated_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.content_title}"