from appcontroller import AppController


class CustomAppController(AppController):

    def __init__(self, *args, **kwargs):
        AppController.__init__(self, *args, **kwargs)

    def start(self):
        AppController.start(self)

    def stop(self):
        AppController.stop(self)

cont = CustomAppController()

while True:
    reg_val = cont.readRegister('forward_count_register', 0)
    if reg_val > 5:
        cont.sendCommands("table_add reflect")
