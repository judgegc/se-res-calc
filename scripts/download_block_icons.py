import urllib.request
from bs4 import BeautifulSoup

WIKI_ENTRY = 'http://spaceengineerswiki.com'
WIKI_BLOCKS = WIKI_ENTRY + '/Block'

def load_blocks_urls():
    soup = BeautifulSoup(urllib.request.urlopen(WIKI_BLOCKS).read(), 'html.parser')
    table = soup.find('table', {'class': 'wikitable'})
    rows = table.findAll('tr')
    totalRows = len(rows)
    blocksUrls = []
    for row in rows[1:totalRows]:
        blocksUrls.append(WIKI_ENTRY + row.find('a')['href'])
    return blocksUrls

def getIconUrl(pageUrl):
    soup = BeautifulSoup(urllib.request.urlopen(pageUrl).read(), 'html.parser')
    return WIKI_ENTRY + soup.find('img')['src']

def main():
    for blockUrl in load_blocks_urls():
        iconUrl = getIconUrl(blockUrl)
        iconName = iconUrl.rsplit('/', 1)[-1].replace('48px-', '').replace('_Icon', '').lower()
        with open('icons/' + iconName, 'wb') as icon:
            icon.write(urllib.request.urlopen(iconUrl).read())

if __name__ == "__main__":
    main()
