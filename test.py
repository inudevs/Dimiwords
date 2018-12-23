import requests

def login(name, pw):
    r = requests.post('http://localhost:3000/api/auth/login', json={
        'name': name,
        'password': pw
    })
    print(r.text)

def join(name, intro, pw, profile):
    r = requests.post('http://localhost:3000/api/create/user', json={
        'name': name,
        'intro': intro,
        'password': pw,
        'profile': profile
    })
    print(r.text)

join('admin', 'hi', 'admin', 'http://dimiwords.tk/static/img/logo.b3e94dc.png')
login('admin', 'admin')
