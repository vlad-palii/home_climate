from django.http import HttpResponse
from django.shortcuts import render
import serial


ser = serial.Serial('/dev/ttyUSB0', 9600)
ser.flushInput()


def read_serial_port_once():
    while True:
        result = ""
        try:
            ser.read_until('Start', 124)
            result = ser.readline()
            if result != "":
                return result.decode().strip()
        finally:
            if result != "":
                return result.decode().strip()


def index(request):
    result = read_serial_port_once()
    if result != "":
        return HttpResponse(result)