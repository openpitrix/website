# Documents for [OpenPitrix](https://github.com/openpitrix/openpitrix).

[![Build Status](https://travis-ci.org/openpitrix/docs.openpitrix.io.svg)](https://travis-ci.org/openpitrix/docs.openpitrix.io)

## Develop

```shell
git clone https://github.com/openpitrix/docs.openpitrix.io.git

cd docs.openpitrix.io

yarn

yarn develop
```

## Contribute

Tree of repo:

```bash
├── content                                         // documents directory
│   ├── v1.0                                        // documents version
│   │   ├── en                                      // documents language 
│   │   │   └── openpitrix-install-guide.md         // document
│   │   └── zh-CN
│   │       └── openpitrix-install-guide.md 
│   ├── toc_v1.0_en.json                            // table of contents, define the page navigation
│   └── toc_v1.0_zh-CN.json
├── src
└── static                                          // put document images here
    └── create-repo.png
```

If you want to edit the document, you can follow the ways below:

### Add new version
 
1. Create a new directory called the new version name under the ``content`` directory

```shell
cd content && mkdir version-xxxx
```

2. Create subdirectories for each language you want to support

```shell
cd content/version-xxxx && mkdir zh-CN en
```

3. Create navigation files for each language of the new version under the ``content`` directory

```shell
cd content

touch toc_version-xxx_en.json toc_version-xxx_zh-CN.json
```

### Edit navigation

navigation file example

- id: should match the format of ``{version}-{language}``
- chapters: nav items
- title: nav title
- entry: nav entry, path to the document to display
- entries: sub navs

```json
{
  "id": "v1.0-zh-CN",
  "chapters": [
    {
      "title": "简介",
      "entry": "./v1.0/zh-CN/basic.md"
    },
    {
      "title": "安装指南",
      "chapters": [
        {
          "title": "部署模式",
          "entries": [
            {
              "entry": "./v1.0/zh-CN/openpitrix-install-guide.md"
            },
            {
              "entry": "./v1.0/zh-CN/allinone.md"
            },
            {
              "entry": "./v1.0/zh-CN/kubernetes.md"
            }
          ]
        }
      ]
    }
  ]
}
```

### Edit Document

document example

```
---
  title: 'document title, will show in nav'
---

  ## title 1

  content 1

  ![](/image.png) 

  this path will request ``/static/image.png``

  ## title 2

  ### subtitle 2.1
    content 2.1
  
  ### title 3
```

`##` will be transformed to an anchor of the page, and will show in the nav.
