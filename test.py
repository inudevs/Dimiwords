import requests

def login(name, pw):
    r = requests.post('http://localhost:3000/api/auth/login', json={
        'name': name,
        'password': pw
    })
    print(r.text)

def join(name, intro, pw, profile):
    r = requests.post('http://localhost:3000/api/new/user', json={
        'name': name,
        'intro': intro,
        'password': pw,
        'profile': profile
    })
    print(r.text)

login('admin', 'admin')
# join('admin', 'hi', 'admin', 'http://dimiwords.tk/static/img/logo.b3e94dc.png')
