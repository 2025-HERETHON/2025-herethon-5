from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

# user
class CustomUser(AbstractUser):
    name = models.CharField(max_length=20, verbose_name="실명")
    def __str__(self):
        return self.username
    
# 마이페이지 - 나의 학습 기록
class LearningRecord(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="사용자")
    curriculum = models.ForeignKey('learn.Curriculum', on_delete=models.CASCADE, verbose_name="학습 내용")
    category = models.ForeignKey('learn.Category', on_delete=models.CASCADE, verbose_name="카테고리")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="마지막 학습일")
    
    class Meta:
        unique_together = ('user', 'curriculum', 'category')
        ordering = ['-updated_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.curriculum.title}"