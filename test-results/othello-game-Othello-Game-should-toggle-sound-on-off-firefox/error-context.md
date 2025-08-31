# Page snapshot

```yaml
- main [ref=e2]:
  - heading "オセロ（リバーシ）ゲーム" [level=1] [ref=e4]
  - generic [ref=e6]:
    - generic [ref=e7]:
      - generic [ref=e10]:
        - text: "黒:"
        - generic [ref=e11]: "2"
      - generic [ref=e14]:
        - text: "白:"
        - generic [ref=e15]: "2"
    - generic [ref=e17]: 黒のターン
  - generic [ref=e20]:
    - heading "ゲームモード" [level=3] [ref=e21]
    - generic [ref=e22]:
      - button "対人戦" [ref=e23] [cursor=pointer]
      - button "AI対戦" [ref=e24] [cursor=pointer]
    - generic [ref=e25]:
      - generic [ref=e26]: "AI難易度:"
      - combobox "AI難易度:" [ref=e27] [cursor=pointer]:
        - option "初級" [selected]
        - option "中級"
        - option "上級"
  - generic [ref=e28]:
    - button "ゲームリセット" [ref=e29] [cursor=pointer]
    - button "パス" [ref=e30] [cursor=pointer]
    - button "ヒント" [ref=e31] [cursor=pointer]
  - generic [ref=e33]:
    - button "🔊" [active] [ref=e34] [cursor=pointer]
    - button "🌙" [ref=e35] [cursor=pointer]
    - button "📊" [ref=e36] [cursor=pointer]
```