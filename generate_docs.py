#!/usr/bin/env python
# coding: utf-8

# In[105]:


import yaml
import json
from urllib.parse import urlencode
from pathlib import Path

docs_config_path = Path('./docs.yaml')
docs_json_output_path = Path("./src/assets/docs.json")

cfg = yaml.safe_load(open(str(docs_config_path), 'r', encoding='utf-8'))


meta = cfg['meta']

docs = cfg['docs']

output = cfg


# In[96]:


class Helpers:
    @classmethod
    def default_param(cls, params: dict[str, dict[str, str | float | int]]):
        return { pname: pcfg['default'] for pname, pcfg in (params or {}).items()}


# In[102]:


for dtype, dtypedoc in docs.items():
    for i, endpoint in enumerate(dtypedoc):
        output['docs'][dtype][i]['code'] = {}
        for lang in meta['templates']:

            fmt_prm = {
                'cURL': '?' + urlencode(Helpers.default_param(endpoint['parameters'])),
                'Python': Helpers.default_param(endpoint['parameters']),
                'NodeJS': Helpers.default_param(endpoint['parameters'])
            }[list(lang.keys())[0]]

            tmptext = list(lang.values())[0].format(
                endpoint=meta['base_url'] + endpoint['endpoint'],
                method=endpoint['method'],
                header=meta['header'],
                formatted_params=fmt_prm
            )
            output['docs'][dtype][i]['code'][list(lang.keys())[0]]=tmptext

            print(f"{list(lang.keys())[0]}\n---\n{tmptext}\n")


# In[106]:


with open(str(docs_json_output_path), 'w', encoding='utf-8') as f:
    json.dump(output, f)

