from django.contrib import admin
from ECUSTapp.models import *

# 新闻表修改（后台超管）
class MSGAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'content', 'poster', 'add_date']

admin.site.register(MSG, MSGAdmin)

# 问答模块修改
class QUEAdmin(admin.ModelAdmin):
    list_display = ['id', 'quesSort', 'quesID', 'quesLikes', 'quesDetails', 'quesDate']

admin.site.register(QUES, QUEAdmin)

# 老师回答
class TEACHERSAdmin(admin.ModelAdmin):
    list_display = ['teacherName', 'teacherID', 'gender', 'phone', 'email', 'subject', 'wechatID', 'academy', 'position', 'department']

admin.site.register(TEACHERS, TEACHERSAdmin)

# 招生计划
class SCHEDULEAdmin(admin.ModelAdmin):
    list_display = ['province', 'subject', 'num', 'money', 'grade']

admin.site.register(SCHEDULE, SCHEDULEAdmin)

# 用户表
class WXUSERAdmin(admin.ModelAdmin):
    list_display = ['userID', 'nickname', 'level', 'province']

admin.site.register(WXUSER, WXUSERAdmin)

class APPLYAdmin(admin.ModelAdmin):
    list_display = ['name', 'province', 'fraction', 'subject']

admin.site.register(APPLY, APPLYAdmin)