from django.shortcuts import render, redirect
from .models import *
from django.shortcuts import get_object_or_404
from accounts.models import LearningRecord
from django.contrib.auth.decorators import login_required
from django.db.models import Count

def category_list(request):
    categories = Category.objects.all().order_by('id')
    
    categories_with_progress = []
    for category in categories:
        total_count = category.curriculums.count()
        
        # 로그인 유저면 LearningRecord에서 완료 강의 수 계산
        if request.user.is_authenticated:
            completed_count = LearningRecord.objects.filter(
                user=request.user,
                category=category
            ).count()
        else:
            # 비로그인 유저는 세션에서 관리하는 경우 (세션에 저장된 커리큘럼 id 리스트와 비교)
            completed_ids = request.session.get('completed_curriculums', [])
            completed_count = Curriculum.objects.filter(
                category=category,
                id__in=completed_ids
            ).count()
        
        categories_with_progress.append({
            'category': category,
            'total': total_count,
            'completed': completed_count,
        })

    context = {
        'categories_with_progress': categories_with_progress,
    }
    return render(request, 'learn/category_list.html', context)

def curriculum(request, category_slug):
    category = get_object_or_404(Category, slug=category_slug)
    curriculums = list(category.curriculums.all().order_by('id'))

    # 로그인 유저인 경우
    if request.user.is_authenticated:
        completed_titles = LearningRecord.objects.filter(
            user=request.user,
            category=category
        ).values_list('content_title', flat=True)
        completed_curriculum_ids = set(Curriculum.objects.filter(
            title__in=completed_titles,
            category=category
        ).values_list('id', flat=True))
    else:
        completed_curriculum_ids = set(request.session.get('completed_curriculums', []))

    # 커리큘럼별 상태 계산
    curriculums_with_status = []
    accessible_found = False  # 최초 1개만 열리게 하기 위해

    for c in curriculums:
        is_completed = c.id in completed_curriculum_ids

        if is_completed:
            is_accessible = True
        elif not accessible_found:
            is_accessible = True
            accessible_found = True  # 다음부터는 비활성화
        else:
            is_accessible = False

        curriculums_with_status.append({
            'curriculum': c,
            'is_completed': is_completed,
            'is_accessible': is_accessible,
        })

    context = {
        'category': category,
        'curriculums_with_status': curriculums_with_status,
    }

    return render(request, 'learn/curriculum.html', context)


def curriculum_detail(request,id):
    # 해당 커리큘럼 연결
    curriculum=get_object_or_404(Curriculum,id=id)

    # 소제목&내용 연결
    subtitles_and_contents = [
        {'subtitle': curriculum.subtitle1, 'content': curriculum.content1},
        {'subtitle': curriculum.subtitle2, 'content': curriculum.content2},
        {'subtitle': curriculum.subtitle3, 'content': curriculum.content3},
    ]

    # 비어있는 소제목/내용은 제외
    subtitles_and_contents = [item for item in subtitles_and_contents if item['subtitle']]

    return render(request, 'learn/curriculum_detail.html', {
        'curriculum': curriculum,
        'sections': subtitles_and_contents,
    })

def learn_complete(request, curriculum_id):
    curriculum = get_object_or_404(Curriculum, id=curriculum_id)

    # 로그인 유저면 기록 저장
    if request.user.is_authenticated:
        LearningRecord.objects.update_or_create(
            user=request.user,
            category=curriculum.category,
            content_title=curriculum.title
        )
    else:
        completed = request.session.get('completed_curriculums', [])
        if curriculum.id not in completed:
            completed.append(curriculum.id)
            request.session['completed_curriculums'] = completed

    # 책 추천
    book_recommendations = curriculum.book_recommendations.all()

    # 다음 커리큘럼 찾기 (같은 카테고리에서 id가 더 큰 것 중 가장 작은 것)
    next_curriculum = Curriculum.objects.filter(
        category=curriculum.category,
        id__gt=curriculum.id
    ).order_by('id').first()

    context = {
        'curriculum': curriculum,
        'next_curriculum': next_curriculum,
        'book_recommendations': book_recommendations,
    }

    return render(request, 'learn/learn_complete.html', context)

def category_complete(request, category_slug):
    # 해당 카테고리 가져오기
    category = get_object_or_404(Category, slug=category_slug)

    # 해당 카테고리의 모든 커리큘럼 가져오기
    curriculums = Curriculum.objects.filter(category=category).order_by('id')

    curriculums_with_status = []

    if request.user.is_authenticated:
        completed_titles = LearningRecord.objects.filter(
            user=request.user, category=category
        ).values_list('content_title', flat=True)
        completed_ids = Curriculum.objects.filter(
            category=category, title__in=completed_titles
        ).values_list('id', flat=True)
    else:
        completed_ids = request.session.get('completed_curriculums', [])

    # 각 커리큘럼의 접근 가능 여부와 완료 여부 판단
    for curriculum in curriculums:
        is_completed = curriculum.id in completed_ids
        is_accessible = True  # category_complete에서는 모두 학습 완료된 상태니까

        curriculums_with_status.append({
            'curriculum': curriculum,
            'is_completed': is_completed,
            'is_accessible': is_accessible,
        })

    context = {
        'category': category,
        'curriculums_with_status': curriculums_with_status,
    }

    return render(request, 'learn/category_complete.html', context)

# 카테고리 안에 있는 모든 커리큘럼을 완료했는지 확인하는 함수
def check_all_curriculums_completed(user_or_session, category):
    # 해당 카테고리에 속한 모든 커리큘럼 조회
    all_curriculums = Curriculum.objects.filter(category=category)

    # 로그인한 유저인 경우
    if user_or_session.is_authenticated:
        # 이 유저가 학습 완료한 커리큘럼 제목만 가져오기
        completed_titles = LearningRecord.objects.filter(
            user=user_or_session,
            category=category
        ).values_list('content_title', flat=True)

        # 완료한 제목을 가진 커리큘럼들의 id만 set으로 저장
        completed_curriculum_ids = set(Curriculum.objects.filter(
            title__in=completed_titles,
            category=category
        ).values_list('id', flat=True))

    # 비로그인 유저인 경우 (세션에서 완료한 커리큘럼 id 리스트 가져오기)
    else:
        completed_curriculum_ids = set(user_or_session.get('completed_curriculums', []))

    return all(curriculum.id in completed_curriculum_ids for curriculum in all_curriculums)