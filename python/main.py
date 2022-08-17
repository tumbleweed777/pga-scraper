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

sample_state = [state_url_paths[0]]

# print(sample_state)


city_url_paths = [];
# for path in state_url_paths:
for path in sample_state:
    state_page = requests.get("https://www.pga.com" + path)
    state_page_text = state_page.text
    soup2 = BeautifulSoup(state_page_text,"html.parser")
    cities = soup2.select_one(selector="ul").select(selector="li a")
    for city in cities:
        city_url_path = city.get("href")
        city_url_paths.append(city_url_path)

# print(city_url_paths)


courses_paths = []
for path in city_url_paths:
    courses_page = requests.get("https://www.pga.com" + path)
    courses_page_text = courses_page.text
    soup3 = BeautifulSoup(courses_page_text, "html.parser")
    courses = soup3.find_all("h5", {"data-cy": "course-name"})
    for course in courses:
        course_url_path = course.parent.parent.parent.parent.get("href")
        courses_paths.append(course_url_path)

# print(courses_paths)
sample_courses = [courses_paths[0]]

for path in sample_courses:
    golf_course_page = requests.get("https://www.pga.com" + path)
    golf_course_page_text = golf_course_page.text
    soup4 = BeautifulSoup(golf_course_page_text, "html.parser")
    course_name = soup4.find("h4", {"data-cy": "facility-name"}).text
    print(course_name)
    a_tags = soup4.find("div", {"data-cy": "course-contacts"}).select(selector="a")
    address = a_tags[0].text
    phone_number = a_tags[1].text
    print(address)
    print(phone_number)

    # professionals_title = soup4.select(selector="h5")
    # if  professionals_title != None:
    #     print(professionals_title)
    # else:
    #     print("no professionals at this course")




