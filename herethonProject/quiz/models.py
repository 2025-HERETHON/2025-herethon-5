from django.db import models

class Quiz(models.Model):
    CATEGORY_CHOICES = [
        ('concept', '개념'),
        ('event', '사건'),
        ('person', '인물'),
        ('history', '역사'),
    ]
    QUESTION_TYPE_CHOICES = [
        ('ox','O/X'),
        ('choice','3지선다'),
    ]
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    order = models.PositiveIntegerField()
    question_type = models.CharField(max_length=10, choices=QUESTION_TYPE_CHOICES)
    question = models.CharField(max_length=255)
    choice1 = models.CharField(max_length=100, blank=True, null=True)
    choice2 = models.CharField(max_length=100, blank=True, null=True)
    choice3 = models.CharField(max_length=100, blank=True, null=True)
    correct_answer = models.CharField(max_length=100)
    explanation = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.category} {self.order}"


