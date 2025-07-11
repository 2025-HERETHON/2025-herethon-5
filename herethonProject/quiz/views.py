from django.shortcuts import render, redirect, get_object_or_404
from .models import Quiz
from accounts.models import LearningRecord
from django.contrib.auth.decorators import login_required
from learn.models import Curriculum

@login_required
def quiz_view(request, category_slug, curriculum_number):
    curriculum = get_object_or_404(Curriculum, category__slug=category_slug, number=curriculum_number)
    quiz = get_object_or_404(Quiz, curriculum=curriculum)

    curriculums_in_category = Curriculum.objects.filter(
        category=curriculum.category
    ).order_by('number') # 해당 커리큘럼과 같은 카테고리에 속한 모든 커리큘럼을 number 기준 오름차순으로 불러옴
    
    number_in_category = curriculum.number
    user_choice = None
    is_correct = None

    if request.method == 'POST':
        user_choice = request.POST.get('answer')
        is_correct = (user_choice == quiz.correct_answer)

        LearningRecord.objects.update_or_create( # 퀴즈 완료 후 학습 기록 update
            user=request.user,
            category=curriculum.category,
            curriculum=curriculum,
            defaults={}
        )

    context = {
        'category': curriculum.category,
        'category_slug': category_slug,
        'quiz': quiz,
        'user_choice': user_choice,
        'is_correct': is_correct,
        'explanation': quiz.explanation,
        'curriculum': curriculum,
        'number_in_category': number_in_category,
    }

    return render(request, 'quiz.html', context)