import csv
import matplotlib.pyplot as plt
from datetime import datetime
from re import sub
from decimal import Decimal

file = csv.DictReader(open('Apple Inc Historical Price Data.csv', mode='r'), ('Date', 'Close', 'Volume', 'Open', 'High', 'Low'), delimiter=',')
next(file)
next(file)
data = {}

for index, row in enumerate(file):
    if index % 5 == 0:
        data[datetime.strptime(row["Date"], '%m/%d/%Y')] = Decimal(sub(r'[^\d.]', '', row["High"]))


plt.plot(data.keys(), data.values())
plt.xlabel('Date (Year)')
plt.ylabel('Price (USD)')
plt.title('Apple Inc Stock Value Over Last 10 Years')

plt.savefig('test.png')

