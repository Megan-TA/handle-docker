# -*- coding: utf-8 -*-
from fontTools.ttLib import TTFont
import matplotlib.pyplot as plt
import re

# font = TTFont('./font/fonteditor.ttf')
# font.saveXML('aaa.xml')

f = open('aaa.xml', 'r')
str = f.read()

# str = '''
#    <contour>
#         <pt x="564" y="201" on="1"/>
#         <pt x="465" y="201" on="1"/>
#         <pt x="465" y="0" on="1"/>
#         <pt x="370" y="0" on="1"/>
#         <pt x="370" y="201" on="1"/>
#         <pt x="9" y="201" on="1"/>
#         <pt x="9" y="265" on="1"/>
#         <pt x="352" y="775" on="1"/>
#         <pt x="465" y="775" on="1"/>
#         <pt x="465" y="279" on="1"/>
#         <pt x="564" y="279" on="1"/>
#       </contour>
#       <contour>
#         <pt x="370" y="279" on="1"/>
#         <pt x="370" y="603" on="1"/>
#         <pt x="370" y="638" on="0"/>
#         <pt x="372" y="683" on="1"/>
#         <pt x="370" y="683" on="1"/>
#         <pt x="363" y="664" on="0"/>
#         <pt x="341" y="623" on="1"/>
#         <pt x="110" y="279" on="1"/>
#       </contour>
# '''


# x = [int(i) for i in re.findall(r'<pt x="(.*?)" y=', str)]
# y = [int(i) for i in re.findall(r'y="(.*?)" on=', str)]
# print(x)
# print(y)
# plt.plot(x, y)
# plt.show()

s = re.search(r'<contour>(.*?)</contour>', str, re.I|re.M)
print(s)
