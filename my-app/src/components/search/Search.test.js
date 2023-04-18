import {render,screen} from "@testing-library/react"
import Search from './Search';
import { EmojiProvider } from '../../context/EmojiContext';

describe("Search component testing...",()=>{

    // beforeEach ile projemiz başlamadan önce çalışacak olan fonksiyon
    beforeEach(() => {
        render(
            <EmojiProvider>
                <Search />
            </EmojiProvider>
        );
    });
    test("Render to search component", ()=>{
        // screen ile var mı yok mu diye kontrol ediyoruz
        expect(screen.getByText("Emoji Search")).toBeInTheDocument(); 
        expect(screen.getByPlaceholderText("Search emoji")).toBeInTheDocument(); 
        // fotoğrafların olup olmadığını kontrol etmek için
        const img = screen.getAllByRole("img");
        expect(img[0]).toHaveAttribute("alt", "grin-cat");
        expect(img[1]).toHaveAttribute("alt", "grinning-cat");
        
    });
});