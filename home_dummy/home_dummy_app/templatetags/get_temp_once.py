import serial
from django import template
register = template.Library()

ser = serial.Serial('/dev/ttyUSB0', 9600)
ser.flushInput()


@register.simple_tag
def get_temp_once():
    print("i'm alive!")
    while True:
        result = ""
        try:
            ser.read_until('Start', 124)
            result = ser.readline()
            if result != "":
                print(result.decode().strip())
                return result.decode().strip()
        finally:
            if result != "":
                print(result.decode().strip())
                return result.decode().strip()


get_temp_once()
