# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""
def get_weekday_time(date,time):
    date = datetime.strptime(date, '%Y-%m-%d')
    weekday = date.weekday()
    conditions = [
    (weekday == 3),
    (weekday == 4),
    (weekday == 5),
    (weekday == 0),
    (weekday == 1),
    (weekday == 2)
    ]
    values = ['Thu', 'Fri', 'Sat', 'Mon', 'Tue', 'Wed']
    w = np.select(conditions, values)
    t = time.replace(':','')
    return ('%s_%s') %(w,t)

from datetime import datetime
date = '2021-10-04'#使用者輸入日期
time = '10:10:00'#使用者輸入時間
date_p = datetime.strptime(date,'%Y-%m-%d')#日期轉成物件
weekday = date_p.weekday()#取得日期的星期
c = 17562 #現貨加權指數，要根據使用者輸入的日期時間去找歷史報價 
k =17650 #使用者輸入履約價

import pandas as pd
import numpy as np
id='1PEFKTYEhLoiyEB-gct4ASPLyb-jSvEpE'
url= f"https://docs.google.com/uc?id={id}&export=download"
wr = pd.read_csv(url).set_index('Unnamed: 0').rename_axis(None)#讀進heatmap

change = int(k)/c -1 #履約價/現貨 -1
w = wr.diff().fillna(0)
weekday_time = get_weekday_time(date,time)#用來搜尋wr的columns
x = (1+w.index)*c#轉換成加權指數之點數
y = w[weekday_time]#搜尋wr columns
distribution = pd.DataFrame(
    {'strike': x,
     'prob': y
    })
win_rate = round(sum(distribution['prob'].loc[(distribution['strike']>=k)]),4)#將大於履約價的機率相加

import matplotlib.pylab as plt
fig,ax = plt.subplots(figsize = (15,6))
plt.bar(distribution.strike,distribution.prob,width=10,alpha=0.5)
ax.set_title('{0} {1} over k(R)={2}; wr={3}; St(K)={4}'.format(date, time, k, win_rate, c),fontsize=20)
plt.xlabel('strike')
plt.ylabel('prob.')
plt.axvline(x=int(k), color='r', linestyle='--')
plt.axvline(x=c, color='k', linestyle='--')

plt.show()
