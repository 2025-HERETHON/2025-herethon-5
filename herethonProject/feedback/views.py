from django.shortcuts import render, redirect, get_object_or_404
from .forms import FeedbackModelForm
from .models import Feedback

# 생성
def feedback_create(request):
    if request.method=='POST':
        form = FeedbackModelForm(request.POST)
        if form.is_valid():
            unfinished_form = form.save(commit=False)
            unfinished_form.writer = request.user
            unfinished_form.save()
            print('의견 작성에 성공했습니다')
            return render(request, 'feedbackComplete.html', {'user': request.user})
    else:
        form = FeedbackModelForm()
    return render(request, 'feedback_create.html', {'form':form})

# 생성만..
# # 전체 조회
# def feedback_list(request):
#     feedbacks = Feedback.objects.all().order_by('-created_at')
#     return render(request,'feedback_list.html', {'feedbacks':feedbacks})

# # 상세 조회
# def feedback_detail(request, feedback_id):
#     feedback = get_object_or_404(Feedback, pk=feedback_id)
#     return render(request, 'feedback_detail.html', {'feedback':feedback})

# # 수정
# def feedback_update(request, id):
#     feedback = get_object_or_404(Feedback, pk=id)
#     if request.method=='POST':
#         form = FeedbackModelForm(request.POST, instance=feedback)
#         if form.is_valid():
#             updated_form = form.save(commit=False)
#             updated_form.is_edited = True
#             updated_form.save()
#             return redirect('feedback_detail', id)
#     else:
#         form = FeedbackModelForm(instance=feedback)
#     return render(request, 'feedback_create.html', {'form':form, 'id':id})

# # 삭제
# def feedback_delete(request, id):
#     feedback = Feedback.objects.get(pk=id)
#     feedback.delete()
#     return redirect('feedback_list')

