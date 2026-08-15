function removeHrefAndSentenceFromContent(content) {
  // Check if the content includes the specified sentence, and if so, remove it
  // Check if the content includes the specified sentence, and if so, remove it

  // Create a temporary div element
  const tempDiv = document.createElement("div");

  // Set its innerHTML to your content
  tempDiv.innerHTML = content;

  // Find all anchor tags within the div
  const anchorTags = tempDiv.querySelectorAll("a");
  const allp = tempDiv.querySelectorAll("p");
  const allh1 = tempDiv.querySelectorAll("h3");
  // Remove the href attribute from each anchor tag
  anchorTags.forEach((aTag) => {
    aTag.removeAttribute("href");
  });
  allp.forEach((all) => all.removeAttribute("class"));

  allp.forEach((all) => all.classList.add("p__singledetail"));

  // Get the modified HTML content
  const modifiedContent = tempDiv.innerHTML;

  return <p dangerouslySetInnerHTML={{ __html: modifiedContent }} />;
}

export default removeHrefAndSentenceFromContent;
