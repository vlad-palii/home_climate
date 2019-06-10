import serial

ser = serial.Serial('/dev/ttyUSB0', 9600)
ser.flushInput()


def read_serial_port():
    while True:
        try:
            ser_bytes = ser.readline()
            print(ser_bytes)
        except:
            print("Data read error")


def read_serial_port_once():
    while True:
        try:
            ser.read_until('Start', 124)
            print(ser.readline())
            return
        except:
            print("Data read error")



