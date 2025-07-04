from django.shortcuts import render, redirect, get_object_or_404
from .models import Quiz
from accounts.models import LearningRecord
from django.contrib.auth.decorators import login_required

@login_required
def quiz_view(request, category, order=1):
    quiz = get_object_or_404(Quiz, category=category, order=order)
    if request.method == 'POST':
        user_choice = request.POST.get('answer')
        is_correct = (user_choice == quiz.correct_answer)
        record, created = LearningRecord.objects.update_or_create(
            user = request.user,
            category = quiz.category,
            content_title = quiz.question,
            # content_title = learn.title(학습 제목), learn 앱 생기면 변경
            defaults={}
        )
        context = {
            'quiz': quiz,
            'user_choice':user_choice,
            'is_correct':is_correct,
            'explanation':quiz.explanation,
            'next_order': order+1,
            'category': category,
        }
        return render(request, 'quiz.html', context)
    return render(request, 'quiz.html', {'quiz':quiz})

