export default function CardComment() {
  return (
    <div className="flex w-full py-2">
      <div className="">
        <div className="mr-[16px] h-[40px] w-[40px] rounded-full bg-white"></div>
      </div>
      <div className="mr-12 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold">Annonymous</p>
          <p className="text-xs">10 juni 2024</p>
        </div>
        <div className="whitespace-pre-wrap text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem sapiente numquam voluptatem iusto dolorum eos
          quibusdam! Fuga dolorem nulla suscipit vitae, blanditiis provident
          autem harum ipsam est atque! Accusamus aliquam obcaecati facere
          doloremque earum tenetur dolorum, non exercitationem? Sunt, non!
        </div>
      </div>
    </div>
  );
}
