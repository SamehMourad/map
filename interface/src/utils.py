from time import sleep

from selenium import webdriver
from selenium.webdriver.chrome.options import Options


class Maps:
    __instance = None

    @staticmethod
    def getInstance():
        if Maps.__instance is None:
            Maps.__instance = Maps()
        return Maps.__instance

    def __init__(self):
        self.options = Options()
        self.options.add_argument('--headless')
        self.driver = webdriver.Remote('http://chrome:4444/wd/hub', desired_capabilities=self.options.to_capabilities())
        self.page = self.driver.get('http://server:8080/map')

    def in_poly(self, lat, lng):
        data = self.driver.execute_script('return inPoly({}, {});'.format(lat, lng))
        return data
