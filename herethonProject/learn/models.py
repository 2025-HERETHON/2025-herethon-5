from django.db import models
from accounts.models import CustomUser

# 상위 카테고리 (개념, 사건, 인물, 역사)
class Category(models.Model):
    name=models.CharField(max_length=100,unique=True)
    slug=models.SlugField(max_length=100, unique=True, blank=True, null=True)

    def __str__(self):
        return self.name

# 커리큘럼
class Curriculum(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='curriculums')
    title = models.CharField(max_length=100) # ex) 강남역 살인 사건
    explanation= models.CharField(max_length=100) # 부제목(설명)

    subtitle1 = models.CharField(max_length=100, blank=True) # 소제목1
    content1 = models.TextField(blank=True) # 본문1
    subtitle2 = models.CharField(max_length=100, blank=True)
    content2 = models.TextField(blank=True)
    subtitle3 = models.CharField(max_length=100, blank=True)
    content3 = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    source=models.TextField() # 출처 

    def __str__(self):
        return self.title
    
# 책 추천
class BookRecommendation(models.Model):
    curriculum = models.ForeignKey('Curriculum', on_delete=models.CASCADE, related_name='book_recommendations')
    title = models.CharField(max_length=200)
    content=models.TextField()
    image = models.ImageField(upload_to='book_images/', blank=True, null=True)  # 이미지
    link = models.URLField(blank=True, null=True)  # 링크

    def __str__(self):
        return f"{self.curriculum.title} - {self.title}"

    
