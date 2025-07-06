from django.db import models
from learn.models import Curriculum

class Quiz(models.Model):
    QUESTION_TYPE_CHOICES = [
        ('ox','O/X'),
        ('choice','3지선다'),
    ]

    curriculum = models.ForeignKey(Curriculum, on_delete=models.CASCADE, related_name='quiz')  # 커리큘럼 당 퀴즈 1개 (OneToOneField)
    question_type = models.CharField(max_length=10, choices=QUESTION_TYPE_CHOICES)
    question = models.CharField(max_length=255)
    choice1 = models.CharField(max_length=100, blank=True, null=True)
    choice2 = models.CharField(max_length=100, blank=True, null=True)
    choice3 = models.CharField(max_length=100, blank=True, null=True)
    correct_answer = models.CharField(max_length=100)
    explanation = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.curriculum.title} 퀴즈"



