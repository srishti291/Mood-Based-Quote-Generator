const moodBackgrounds = {
  happy: 'url("images/happy.jpg")',
  sad: 'url("images/sad.jpg")',
  motivated: 'url("images/motivated.jpg")',
  anxious: 'url("images/anxious.jpg")',
  calm: 'url("images/calm.jpg")'
};

function setBackground(mood) {
  console.log('Setting background for mood:', mood);
  if (moodBackgrounds[mood]) {
    console.log('Background URL:', moodBackgrounds[mood]);
    document.body.style.backgroundImage = moodBackgrounds[mood];
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundColor = 'transparent'; // or remove gradient
  } else {
    document.body.style.backgroundImage = 'none';
    document.body.style.background = 'linear-gradient(135deg, #ffecd2, #fcb69f)';
  }
}

async function generateQuote() {
  console.log('generateQuote called');
  const mood = document.getElementById("moodSelect").value;
  const display = document.getElementById("quoteDisplay");
  const heading = document.getElementById("moodHeading");

  if (!mood) {
    heading.innerText = "Please select a mood";
    display.style.opacity = 0;
    display.innerText = "";
    setBackground(null);
    return;
  }

  try {
    console.log('Fetching quote for mood:', mood);
    const res = await fetch(`/api/quotes?mood=${encodeURIComponent(mood)}`);
    const data = await res.json();
    console.log('Response:', res.ok, data);

    if (!res.ok) {
      heading.innerText = "Unsupported mood";
      display.style.opacity = 0;
      display.innerText = data.error || "Try: happy, sad, motivated, anxious, calm.";
      return;
    }

    heading.innerText = `Your mood: ${mood.charAt(0).toUpperCase() + mood.slice(1)}`;
    setBackground(mood);

    display.style.opacity = 0;
    setTimeout(() => {
      display.innerText = data.quote;
      display.style.opacity = 1;
    }, 200);

  } catch (e) {
    console.error('Error:', e);
    heading.innerText = "Something went wrong";
    display.style.opacity = 0;
    display.innerText = "Please try again.";
  }
}

document.getElementById("getQuoteBtn").addEventListener("click", generateQuote);
