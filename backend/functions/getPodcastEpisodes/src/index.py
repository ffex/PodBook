from appwrite.client import Client
import feedparser
import asyncio
import json


"""
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
"""

def main(req, res):
  client = Client()

  if not req.variables.get('APPWRITE_FUNCTION_ENDPOINT') or not req.variables.get('APPWRITE_FUNCTION_API_KEY'):
    print('Environment variables are not set. Function cannot use Appwrite SDK.')
  else:
    (
    client
      .set_endpoint(req.variables.get('APPWRITE_FUNCTION_ENDPOINT', None))
      .set_project(req.variables.get('APPWRITE_FUNCTION_PROJECT_ID', None))
      .set_key(req.variables.get('APPWRITE_FUNCTION_API_KEY', None))
      .set_self_signed(True)
    )
  
  payload = json.loads(req.payload)
  rss = feedparser.parse(payload["rssUrl"])
  print(rss.feed.title)
  print(rss.feed.image.href)
  print(len(rss.entries))
  #print(rss.entries[0])
  i=0
  my_list=[]
  for val in rss.entries:
      newVal={"index":i,"title":val.title,"link":val.enclosures[0].href}
      my_list.append(newVal)
      i=i+1
  print(my_list)
  
  return res.json({
    "title":rss.feed.title,
    "image":rss.feed.image.href,
    "numberEp":len(rss.entries),
    "arrayList":my_list
    
  })