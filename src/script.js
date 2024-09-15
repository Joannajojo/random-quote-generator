let previousInt = null;  // Variable to store the previous random index

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function lightenColor(hex, percent) {
    let num = parseInt(hex.slice(1), 16);
    let r = (num >> 16) + Math.round(2.55 * percent),
        g = (num >> 8 & 0x00FF) + Math.round(2.55 * percent),
        b = (num & 0x0000FF) + Math.round(2.55 * percent);

    return '#' + (
        0x1000000 +
        (r < 255 ? (r < 1 ? 0 : r) : 255) * 0x10000 +
        (g < 255 ? (g < 1 ? 0 : g) : 255) * 0x100 +
        (b < 255 ? (b < 1 ? 0 : b) : 255)
    ).toString(16).slice(1);
}

function newQuote() {
    const quotes = [
        { 
            quote: "Life is not measured by the number of breaths we take, but by the moments that take our breath away.", 
            author: "Maya Angelou" 
        },
        { 
            quote: "If you judge people, you have no time to love them.", 
            author: "Mother Teresa" 
        },
        { 
            quote: "The most courageous act is still to think for yourself. Aloud.", 
            author: "Coco Chanel" 
        },
        { 
            quote: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", 
            author: "Albert Einstein" 
        }
    ];

    let randomInt;
    do {
        randomInt = Math.floor(Math.random() * quotes.length);
    } while (randomInt === previousInt);

    previousInt = randomInt;  // Store the new random number for next comparison

    const selectedQuote = quotes[randomInt].quote;
    const selectedAuthor = quotes[randomInt].author;
    const randomColor = getRandomColor();
    const hoverColor = lightenColor(randomColor, 20);

    // Fade out current quote and update after fading out
    $("#quote , #text, #quote-author").fadeOut(1000, function() {
        $("#text").text(selectedQuote);
        $("#quote-author").text("- " + selectedAuthor);

        // Update tweet link
        const tweetText = encodeURIComponent(`"${selectedQuote}" - ${selectedAuthor}`);
        $("#tweet-quote").attr("href", `https://twitter.com/intent/tweet?text=${tweetText}`);

        // Change colors
        $('body').css('background-color', randomColor);
        $('#text, #quote-author').css('color', randomColor);
        $('#tweet-quote i , #quote').css('color', randomColor);
        $('#new-quote').css('background-color', randomColor);

        // Handle hover effect on button
        $("#new-quote").hover(
          //  first function is executed when the mouse hovers over the element
            function() {
                $(this).css('background-color', hoverColor);
            }, function() {
                $(this).css('background-color', randomColor); //executed when the mouse leaves the element.
            }
        );
      
        $("#tweet-quote i").hover(
            function() {
                $(this).css('color', hoverColor);
            }, function() {
                $(this).css('color', randomColor);
            }
        );
		$("#quote , #text, #quote-author").css('opacity', 1);

        // Fade in the updated content
        $("#quote , #text, #quote-author").fadeIn(1000);
    });
    console.log("New quote generated");
}

// Trigger the new quote on page load
window.onload = function() {
    
    $("#quote , #text, #quote-author").css('opacity', 0);

    newQuote();

    setTimeout(function() {
        $('body').css('opacity', 1);
        $("#quote , #text, #quote-author").fadeIn(1000); // Fade in the quote container
    }, 1000);
};

$(document).ready(function() {
    $("#new-quote").click(function() {
        newQuote();
    });
});
