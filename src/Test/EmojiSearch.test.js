import React from 'react'
import { fireEvent, render,screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'

describe("App Tests", () => {
    console.log("Her testten önce çalışıyorum..");
    beforeEach(() => {
    render(<App />);
  });

  //Başlık kısmının başarılı bir şekilde render edildiğini kontrol eden test kodu
  test("Başlık render ediliyor...", () => {
    const header = screen.getByText("Emoji Search");
    expect(header).toBeInTheDocument();
  });

  //Uygulama ilk açıldığında emoji listesinin başarılı bir şekilde render edildiğini kontrol eden test kodu.
  test("Emoji listesi render ediliyor...", () => {
    const items = screen.getAllByText("Click to copy emoji");
    expect(items.length).toEqual(20);
  });

  //Bir filtreleme işlemi yapıldığında, emoji listesinin bu filtreye uygun şekilde yeniden render edildiğini kontrol eden test kodu.
  test("Filtreleme yapılıyor...", () => {
    const emoji = "Soccer";
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: emoji } });
    expect(screen.getByText(emoji)).toBeInTheDocument();
  });

  //Liste üzerinden herhangi emojiye tıklandığında, ilgili emojinin kopyalandığını kontrol eden test kodu
  test("Kopyalama yapılıyor...", () => {
    const click = screen.getAllByText("Click to copy emoji").at(0);
    const parent = click.parentElement;
    expect(parent.getAttribute("data-clipboard-text").length).toBeGreaterThan(0);
  });
});
