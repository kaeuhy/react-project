import "./App.css";
import { Button } from "@/components/ui/button.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { ChefHat } from "lucide-react";

function App() {
  return (
    <div>
      <ChefHat />
      <Popover>
        <PopoverTrigger asChild>
          <Button>open</Button>
        </PopoverTrigger>
        <PopoverContent>content</PopoverContent>
      </Popover>
      <Toaster />
      <Carousel className="mx-10">
        <CarouselContent>
          <CarouselItem>1</CarouselItem>
          <CarouselItem>2</CarouselItem>
          <CarouselItem>3</CarouselItem>
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
      <Button
        onClick={() => toast("안녕하세요", { position: "top-center" })}
        className="bg-yellow-500"
      >
        버튼
      </Button>
    </div>
  );
}

export default App;
