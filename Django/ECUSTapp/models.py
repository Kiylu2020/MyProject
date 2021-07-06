from django.db import models

# Create your models here.

#报名表
class APPLY(models.Model):
    postnum = models.IntegerField(default=1)
    name = models.CharField(max_length=20)
    province = models.CharField(max_length=7)
    fraction = models.FloatField()
    phone = models.CharField(max_length=12)
    qq = models.CharField(max_length=11)
    email = models.CharField(max_length=30)
    subject = models.CharField(max_length=18)
    highschool = models.CharField(max_length=10)
    remarks = models.CharField(max_length=255)
    class Meta:
        verbose_name = '报名表'
        verbose_name_plural = verbose_name
    def __str__(self):
        return self.name


#咨讯表
class MSG(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    poster = models.URLField()
    add_date = models.DateField()
    class Meta:
        verbose_name = '咨讯新闻表'
        verbose_name_plural = verbose_name
    def __str__(self):
        return self.title


#用户表
class WXUSER(models.Model):
    level = models.IntegerField(default=1)
    userID = models.IntegerField()
    nickname = models.CharField(max_length=20)
    province = models.CharField(max_length=10, default='上海')
    user_icon = models.URLField(default='https://www.ecustwxapp.com/media/img/login_logo.png')
    class Meta:
        verbose_name = '用户表'
        verbose_name_plural = verbose_name

#问答模块表
class QUES(models.Model):
    """
    问答模块的目录
    """
    quesID = models.IntegerField()
    quesTitle = models.CharField(max_length=17, default='None')
    quesDetails = models.TextField()
    quesLocation = models.CharField(max_length=10, default='上海市')
    quesLikes = models.IntegerField(default=0)
    recommond = models.IntegerField(default=0)
    quesFloor = models.IntegerField()
    quesSort = models.CharField(max_length=20)
    quesDate = models.DateTimeField(auto_now_add=True)
    username = models.CharField(max_length=20, default='ECUST')
    user_icon = models.URLField(default='https://www.ecustwxapp.com/media/img/login_logo.png')

class ANS(models.Model):
    """
    关联问题的回答表，联级删除
    """
    question = models.ForeignKey(to='QUES', related_name='ans_ques', on_delete=models.CASCADE)
    user_name = models.CharField(max_length=50)
    user_icon = models.URLField(default='https://www.ecustwxapp.com/media/img/login_logo.png')
    ans_text = models.TextField(max_length=1999)
    ansLikes = models.IntegerField(default=0)
    ansFloor = models.IntegerField(default=-1)


class TEACHERS(models.Model):
    """
    教师权限申请表
    """
    teacherName = models.CharField(max_length=10)
    teacherID = models.CharField(max_length=8)
    gender = models.CharField(max_length=5, default='None')
    phone = models.CharField(max_length=12)
    email = models.CharField(max_length=35)
    # 专业
    subject = models.CharField(max_length=10)
    wechatID = models.CharField(max_length=15)
    # 学院
    academy = models.CharField(max_length=12, default='None')
    # 职称
    position = models.CharField(max_length=6)
    # 部门
    department = models.CharField(max_length=12)
    class Meta:
        verbose_name = '老师权限申请表'
        verbose_name_plural = verbose_name
    def __str__(self):
        return self.teacherID

#招生计划表
class SCHEDULE(models.Model):
    province = models.CharField(max_length=5)
    subject = models.CharField(max_length=15)
    num = models.IntegerField()
    money = models.IntegerField()
    grade = models.CharField(max_length=10)
    class Meta:
        verbose_name = '招生计划表'
        verbose_name_plural = verbose_name
    def __str__(self):
        return self.name