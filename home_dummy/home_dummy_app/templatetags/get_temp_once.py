import serial
from django import template
register = template.Library()


@register.simple_tag
def get_temp_once():
    while True:
        try:
            ser = serial.Serial('/dev/ttyUSB1', 9600)
            ser.flushInput()
            ser.read_until('Start', 124)
            result = ser.readline()
            if result != "":
                return result.decode().strip()
        except:
            print("Data error")
            return
