from django.shortcuts import render
from .forms import FeedbackModelForm

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
    return render(request, 'mypage_feedback.html', {'form':form})


