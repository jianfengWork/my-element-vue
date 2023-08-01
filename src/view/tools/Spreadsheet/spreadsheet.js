export const baseOptions = {
  mode: 'edit', // edit | read
  showToolbar: true,
  showBottomBar: false,
  showGrid: true,
  showContextmenu: true,
  view: {
    height: () => document.documentElement.clientHeight,
    width: () => document.documentElement.clientWidth,
  },
  row: {
    len: 100,
    height: 35,
  },
  col: {
    len: 26,
    width: 180,
    indexWidth: 60,
    minWidth: 60,
  },
  style: {
    bgcolor: '#ffffff',
    align: 'left',
    valign: 'middle',
    textwrap: false,
    strike: false,
    underline: false,
    color: '#0a0a0a',
    font: {
      name: 'YaHei',
      size: 10,
      bold: false,
      italic: false,
    },
  },
}

export const dataOptions = {
  "name": "sheet1",
  "freeze": "A1",
  "styles": [
    {
      "align": "center"
    },
    {
      "font": {
        "bold": true
      },
      "color": "#c00000",
      "align": "center"
    }
  ],
  "merges": [],
  "rows": {
    "0": {
      "cells": {
        "2": {
          "text": "省法院概况数据",
          "style": 0,
          "data": []
        }
      }
    },
    "1": {
      "cells": {
        "0": {
          "text": "3.诉源案件收案",
          "data": []
        }
      }
    },
    "2": {
      "cells": {
        "0": {
          "text": "地区",
          "style": 1,
          "data": []
        },
        "1": {
          "text": "法院",
          "style": 0,
          "data": []
        },
        "2": {
          "text": "新收",
          "style": 0,
          "data": []
        },
        "3": {
          "text": "上年新收",
          "style": 0,
          "editable": false,
          "data": []
        },
        "4": {
          "text": "同比",
          "style": 0,
          "data": []
        }
      }
    },
    "3": {
      "cells": {
        "0": {
          "text": "A4",
          "style": 0,
          "data": []
        },
        "1": {
          "text": "B4",
          "style": 0,
          "data": []
        },
        "2": {
          "text": "C4",
          "style": 0,
          "data": []
        },
        "3": {
          "text": "D4",
          "style": 0,
          "data": []
        },
        "4": {
          "text": "E4",
          "style": 0,
          "data": []
        }
      }
    },
    "len": 100
  },
  "cols": {
    "len": 26
  },
  "validations": [],
  "autofilter": {}
}
