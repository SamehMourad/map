from selenium import webdriver
from selenium.webdriver.chrome.options import Options


class Maps:
    __instance = None

    @staticmethod
    def getInstance():
        if Maps.__instance is None:
            Maps()
        return Maps.__instance

    def __init__(self):
        if Maps.__instance is not None:
            raise Exception("Hi")
        else:
            Maps.__instance = self

        self.options = Options()
        self.options.add_argument('--headless')
        self.driver = webdriver.Remote('http://hub:4444/wd/hub', desired_capabilities=self.options.to_capabilities())
        self.page = self.driver.get('http://localhost:8080/map')

    def in_poly(self, lat, lng):
        exists = self.driver.execute_script('typeof inPoly')
        if exists is None:
            file = open('./app.js', 'r').read()
        else:
            file = ''
        data = self.driver.execute_script('''{} return inPoly({},{});'''.format(file, lat, lng))
        return data