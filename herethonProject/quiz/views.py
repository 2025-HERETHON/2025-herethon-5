from django.shortcuts import render, redirect, get_object_or_404
from .models import Quiz
from accounts.models import LearningRecord
from django.contrib.auth.decorators import login_required
from learn.models import Curriculum

@login_required
def quiz_view(request, curriculum_id):
    curriculum = get_object_or_404(Curriculum, id=curriculum_id)
    category_slug = curriculum.category.slug
    quiz = get_object_or_404(Quiz, curriculum=curriculum)

    if request.method == 'POST':
        user_choice = request.POST.get('answer')
        is_correct = (user_choice == quiz.correct_answer)

        record, created = LearningRecord.objects.update_or_create(
            user=request.user,
            category=curriculum.category,
            content_title=curriculum.title,
            defaults={}
        )

        context = {
            'quiz': quiz,
            'user_choice': user_choice,
            'is_correct': is_correct,
            'explanation': quiz.explanation,
            'curriculum': curriculum,
            'category_slug': category_slug,
        }
        return render(request, 'quiz.html', context)

    return render(request, 'quiz.html', 
                {'quiz': quiz, 
                'curriculum': curriculum,
                'category_slug': category_slug})





