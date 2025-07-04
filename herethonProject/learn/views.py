from django.shortcuts import render
from .models import *
from django.shortcuts import get_object_or_404

# Create your views here.
def category_list(request):
    categories = Category.objects.all().order_by('id')
    return render(request, 'learn/category_list.html', {'categories': categories})

def curriculum(request, category_slug):
    # 해당 카테고리 연결
    category = get_object_or_404(Category, slug=category_slug)
    # 해당 커리큘럼 가져오기
    curriculums = category.curriculums.all().order_by('id') # 역참조
    return render(request, 'learn/curriculum.html', {
        'category': category,
        'curriculums': curriculums,
    })

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

    # 로그인한 경우 진도 저장 
    if request.user.is_authenticated:
        progress, created = CurriculumProgress.objects.get_or_create(
            user=request.user,
            curriculum=curriculum,
            defaults={'progress_stage': 1}  # 기본 1단계로 생성
        )
        if not created:
            # 이미 존재할 경우, 학습하기 페이지 들어온 거니까 progress_stage를 1로 초기화 (원하는 대로)
            progress.progress_stage = 1
            progress.save()

    return render(request, 'learn/curriculum_detail.html', {
        'curriculum': curriculum,
        'sections': subtitles_and_contents,
    })