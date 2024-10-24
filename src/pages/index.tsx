import { Button } from '@/components/ui/button';
import { useState } from 'react';
import styles from '@/styles/index.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Page() {
  const [openLetter, setOpenLetter] = useState<boolean>(false);
  const [showDates, setShowDates] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<number>(null);
  const [countClicks, setCountClicks] = useState<number>(0);
  const [yesButtonWidth, setYesButtonWidth] = useState<number>(75);
  const [yesButtonHeight, setYesButtonHeight] = useState<number>(40);
  const [yesButtonTextSize, setYesButtonTextSize] = useState<number>(20);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const router = useRouter();

  const dates = [
    { id: 1, text: '27/10/2024' },
    { id: 2, text: '28/10/2024' },
    { id: 3, text: '29/10/2024' },
  ];

  const noButtonText = [
    'Não',
    'Tem certeza?',
    'Nenéeem nãaaao',
    'Num faz assim :(',
    'Mas mas mas, meu coraçãooo',
    'Eu eu, eu vou chorar...',
  ];

  function handleShowDates() {
    setShowDates(true);
  }

  function handleNoOption() {
    if (countClicks < 5) {
      setCountClicks(countClicks + 1);
      setYesButtonHeight((previous) => previous + 35);
      setYesButtonWidth((previous) => previous + 35);
      setYesButtonTextSize((previous) => previous + 25);
    }
  }

  async function submit() {
    try {
      setSubmitting(true);
      await axios.post('/api/webhook', { date: dates.find((date) => date.id === selectedDate)?.text });

      router.push('/');
    } catch (error) {
      console.log({ error });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative">
      <div className={styles.background}>
        <div className={styles.one}>
          <div className={styles.container}>
            <div
              className={openLetter ? [styles['envelope-wrapper'], styles.flap, styles.open].join(' ') : styles['envelope-wrapper']}
              onClick={() => setOpenLetter(true)}
            >
              <div className={styles.envelope}>
                <div className={styles.letter}>
                  <div className={styles.text}>
                    <strong>Para Camila,</strong>
                    <p>
                      Aprecio muito o tempo que passamos juntos, todo dia você faz meu dia mais feliz e coloca um sorriso em meu rosto.
                      Agradeço muito por todos os carinhos e conversas que tenho, você têm se tornado alguém cada dia mais especial em minha
                      vida. Te conhecer cada vez mais tem sido incrível e espero que possamos nos conhecer cada dia mais.
                    </p>
                    <p className={styles.love}>Gosto muito de ti!</p>
                    <div className={styles.pana}>
                      <img src="icons/heartarrow.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.heart}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[100vh] z-0 relative">
        <div className="absolute top-0 h-full flex items-center justify-center flex-col w-full">
          <div className="bg-neutral-100 relative shadow-md hover:shadow-xl duration-150 hover:scale-105 rounded-md w-[34rem] flex justify-center flex-col border-2 border-black">
            <div className="relative border-b-2 border-black">
              <div className="text-center py-5">
                <h2 className="text-4xl font-bold text-[#000000] my-4">
                  {showDates ? 'AAAAAAAA EU FELIZ. VAMOS MARCAR A DATAA!' : 'Huanhuan você aceita se casar comigo?'}
                </h2>
                {showDates ? (
                  <div className="flex flex-row gap-4 mb-8 items-center justify-center">
                    {dates.map((date) => (
                      <Button
                        variant="outline"
                        className={selectedDate === date.id && 'border border-blue-700 bg-blue-500/80 hover:bg-blue-500/60'}
                        onClick={() => setSelectedDate(date.id)}
                      >
                        {date.text}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-row w-full items-center justify-center gap-4">
                    <Button
                      className="bg-emerald-600 hover:bg-emerald-600/80"
                      style={{
                        width: yesButtonWidth,
                        height: yesButtonHeight,
                        fontSize: yesButtonTextSize,
                        padding: `${yesButtonTextSize / 20}rem ${yesButtonTextSize / 14}rem`,
                      }}
                      onClick={handleShowDates}
                    >
                      Sim
                    </Button>
                    <Button variant="destructive" onClick={handleNoOption}>
                      {noButtonText[countClicks]}
                    </Button>
                  </div>
                )}

                {selectedDate && (
                  <Button className="bg-black hover:bg-black/80" disabled={!selectedDate || submitting} onClick={submit}>
                    Confirm Date
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
