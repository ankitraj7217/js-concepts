function prettyHTML(str, styles) {
    // Write your code here
    const myMap = {};
    styles.forEach((style) => {
      const [start, end, tag] = style;
  
      if (!myMap[start]) myMap[start] = [];
      myMap[start].push(`<${tag}>`);
  
      for (let idx in myMap) {
        if (idx > start && idx <= end) {
          myMap[idx].push(`<${tag}>`);
          myMap[idx].unshift(`</${tag}>`);
        }
      }
  
      if (!myMap[end + 1]) myMap[end + 1] = [];
      myMap[end + 1].push(`</${tag}>`);
    });
  
      console.log(myMap)
  
    const strList = [];
    for (let i = 0; i < str.length; i++) {
      if (str[i].trim().length) {
        strList.push(str[i]);
      } else {
        strList.push(" " + str[i + 1]);
        i++;
      }
    }
  
      console.log(strList)
  
    let html = "";
  
    for (let i = 0; i < strList.length; i++) {
      html += myMap[i] ? `${myMap[i].join("")}${strList[i]}` : strList[i];
    }
  
    if (myMap[strList.length]) {
      html += myMap[strList.length];
    }
  
    return html;
  }
  
  const input = "Hello, world";
  const styles = [
    [0, 2, "i"],
    [4, 9, "b"],
    [7, 10, "u"],
  ];
  const result = prettyHTML(input, styles);
  
  console.log(result);
  
  const input2 = "Overlap test";
  const styles2 = [
    [1, 6, "b"], // Bold "Overlap"
    [0, 9, "u"], // Underline "lap tes"
  ];
  const result2 = prettyHTML(input2, styles2);
  const expected2 = "<b>Ove<u>rlap</u></b><u> tes</u>t";
  console.log(result2);
//   console.log(expected2);
//   console.log(result2 === expected2);
  