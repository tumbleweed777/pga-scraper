from bs4 import BeautifulSoup
import requests

response = requests.get("https://www.pga.com/play")

pga_play_page = response.text

soup = BeautifulSoup(pga_play_page, "html.parser")
states = soup.select_one(selector="ul").select("li a")

state_url_paths = []
for state in states:
    state_url_path = state.get("href")
    state_url_paths.append(state_url_path)

# print(state_url_paths[0])

city_url_paths = [];
state_page = requests.get("https://www.pga.com" + state_url_paths[0])
state_page_text = state_page.text
soup2 = BeautifulSoup(state_page_text,"html.parser")
cities = soup2.select_one(selector="ul").select(selector="li a")
for city in cities:
    city_url_path = city.get("href")
    city_url_paths.append(city_url_path)

# print(city_url_paths[0])

courses_paths = []
courses_page = requests.get("https://www.pga.com" + city_url_paths[0])
courses_page_text = courses_page.text
soup3 = BeautifulSoup(courses_page_text, "html.parser")
# print(soup3)
courses = soup3.find_all("h5", {"data-cy": "course-name"})
for course in courses:
    course_url_path = course.parent.parent.parent.parent.get("href")
    courses_paths.append(course_url_path)

print(courses_paths)

# print(courses)

