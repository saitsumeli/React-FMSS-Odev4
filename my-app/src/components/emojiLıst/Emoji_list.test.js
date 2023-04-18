import { render, screen, fireEvent } from "@testing-library/react";
import EmojiList from "./EmojiList";
import { EmojiProvider } from "../../context/EmojiContext";
import emojiList from "../../data/emojiList.json";
describe("List component to rendering...", () => {
    // beforeEach ile projemiz başlamadan önce çalışacak olan fonksiyon 
  beforeEach(() => {
    render(
      <EmojiProvider>
        <EmojiList />
      </EmojiProvider>
    );
  });

  test("Show list",()=>{
    // ilk 10 emoji için
    const emoji = emojiList.slice(0,10) 
    emoji.map(item=>{
        return expect(screen.getByText(item.title)).toBeInTheDocument()
    })
  })
  test("Clicking on the copy text will copy the emoji", () => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: jest.fn(),
      },
      writable: true,
    });

    const copyBtn = screen.getAllByText("Click to copy emoji"); // "click to copy emojı" almak için yaptık 
    // ögelere click ekledik
    fireEvent.click(copyBtn[0]); 
    // navigator.clipboard.writeText almak için yaptık 
    expect(navigator.clipboard.writeText).toHaveBeenCalled(); 
  });

  test("Appropriate emoji should be rendered when filtering is done", () => {
    const filter = "grin";
    

    // emojı dızımızde yukarıda yazdıgımız fılter parametresının degerı ise filteredEmojıes adında bır dızı olusturduk. ve expect fonksıyonuyla olusan dızının uzunlugu 3 mu degıl mı ona baktık.
    const filteredEmojies = emojiList.filter((item) => {
     return item.keywords.toLocaleLowerCase().match(filter) ||
        item.title.toLowerCase().match(filter);
        
    });
    expect(filteredEmojies).toHaveLength(3);

    
    console.log(filteredEmojies)
    filteredEmojies.forEach((emoji) => {
      expect(screen.getByText(emoji.title)).toBeInTheDocument(); // title render
    });
    filteredEmojies.forEach((emoji) =>
      expect(screen.getByText(emoji.symbol)).toBeInTheDocument() // symbol render
    );
  });


});