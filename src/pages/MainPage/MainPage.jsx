import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Table, Card, CardUser, ManageButton } from "../../components";
import {
  ContainerCards,
  LeftCards,
  RightCards,
  Link,
  Text,
  CodeLabel,
  TheTableContainer,
  LeftTable,
  TopTable,
  RightTable,
  BottomTable,
  NameLabel,
  TaskInput,
  ButtonTask,
} from "./Styles";
import { useParams } from "react-router-dom";
import {
  useGetRoom,
  useShowVotes,
  useUpdateTaskName,
} from "../../hooks/querys/room";
import { useGetUsers } from "../../hooks/querys/user";
import { useVote } from "../../hooks/querys/user";
import ErrorBox from "../../components/ErrorBox/ErrorBox";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/auth";
import { useQueryClient } from "@tanstack/react-query";

export default function MainPage() {
  const [errorText, setErrorText] = useState(null);
  const [fibonacci, setFibonacci] = useState([0, 1, 2, 3, 4, 5]);
  const userID = useAuthStore((state) => state?.auth?.user?._id);
  const { code } = useParams();
  const navigate = useNavigate();
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [top, setTop] = useState([]);
  const [task, setTask] = useState("");
  const [bottom, setBottom] = useState([]);
  const queryClient = useQueryClient();
  const cardSuits = ["\u{2660}", "\u{2665}", "\u{2666}", "\u{2663}"];
  const { register, handleSubmit, reset } = useForm();
  const [canShow, setCanShow] = useState(false);
  const [canShowText, setCanShowText] = useState("Show");

  const {
    data: getRoom,
    isLoading: isRoomLoading,
    isError: isRoomError,
  } = useGetRoom({
    code,
    onError: (err) => {
      console.log("Erro ao buscar a sala:", err);
      navigate("/");
    },
    onSuccess: () => {},
    refetchInterval: 0,
    staleTime: 0,
  });

  const { mutate: updateTask } = useUpdateTaskName({
    onSuccess: () => {
      queryClient.invalidateQueries(["room"]);
    },
  });
  const onSubmit = (data) => {
    const code = getRoom.code;
    updateTask({ currentTask: data.taskName, code });
    reset();
  };
  const isCreator = getRoom?.users.some(
    (user) => user._id === userID && user.type === true
  );

  const { mutate: vote } = useVote({
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {},
  });

  const { mutate: showVotes } = useShowVotes({
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {},
  });
  const [avarage, setAvarage] = useState(0);
  const [median, setMedian] = useState(0);
  const [mode, setMode] = useState(0);

  function calculateAverageVote() {
    if (getRoom) {
      let totalVotes = 0;
      let count = 0;

      getRoom.users.forEach((user) => {
        if (user.vote !== undefined && user.vote !== null && user.vote > 0) {
          totalVotes += user.vote;
          count += 1;
        }
      });
      setAvarage((totalVotes / count).toFixed(2));
    }
  }

  function calculateModeVote() {
    if (getRoom) {
      const votes = getRoom.users
        .map((user) => user.vote)
        .filter((vote) => vote !== undefined && vote !== null && vote >= 0);

      if (votes.length === 0) {
        setMode(null);
        return;
      }

      const frequency = {};
      let maxFrequency = 0;
      let mode = null;

      votes.forEach((vote) => {
        frequency[vote] = (frequency[vote] || 0) + 1;
        if (frequency[vote] > maxFrequency) {
          maxFrequency = frequency[vote];
          mode = vote;
        }
      });

      setMode(mode);
    }
  }

  function calculateMedianVote() {
    if (getRoom) {
      const votes = getRoom.users
        .map((user) => user.vote)
        .filter((vote) => vote !== undefined && vote !== null && vote >= 0);

      if (votes.length === 0) {
        setMedian(0);
        return;
      }

      votes.sort((a, b) => a - b);

      const middle = Math.floor(votes.length / 2);

      if (votes.length % 2 !== 0) {
        setMedian(votes[middle]);
      } else {
        setMedian((votes[middle - 1] + votes[middle]) / 2);
      }
    }
  }
  function generateFibonacci() {
    const fibSequence = [0, 1, 2];

    for (let i = 3; i < 9; i++) {
      const nextNumber = fibSequence[i - 1] + fibSequence[i - 2];
      fibSequence.push(nextNumber);
    }
    setFibonacci(fibSequence);
  }

  function doVote(num) {
    const hasUserVoted = num > 0;

    vote(
      { id: userID, body: { vote: num, hasVoted: hasUserVoted } },
      {
        onSuccess: () => {
          setHasVoted(hasUserVoted);
          refetch();
        },
      }
    );
  }

  useEffect(() => {
    setLeft(getRoom?.users.slice(0, 3));
    setTop(getRoom?.users.slice(3, 9));
    setRight(getRoom?.users.slice(9, 12));
    setBottom(getRoom?.users.slice(12));
    calculateAverageVote();
    calculateMedianVote();
    calculateModeVote();
    setCanShow(getRoom?.show);
    if (isRoomError) {
      setErrorText("Impossível conectar à sala");
    }
  }, [getRoom, isRoomLoading]);

  useEffect(() => {
    if (!canShow) {
      doVote(-1);
      const numberCards = document.querySelectorAll(".number-card");
      numberCards.forEach((card) => {
        card.style.backgroundColor = "#222222";
        card.style.color = "gold";
      });
    }
  }, [canShow]);

  useEffect(() => {
    generateFibonacci();
  }, []);
  return (
    <>
      <ErrorBox
        text={errorText}
        modalDisplay={errorText ? "flex" : "none"}
        closeModal={() => {
          setErrorText(null);
          navigate("/");
        }}
      ></ErrorBox>

      {isRoomLoading ? (
        <p>Room Loading</p>
      ) : (
        <>
          <NameLabel>Sala: {getRoom?.name}</NameLabel>
          <CodeLabel>Código: {code}</CodeLabel>
          <LeftCards>
            <Link
              href={
                "https://www.notion.so/notioncpe/Vote-Consciente-dfb88593dd6b4a93ba145eb05a078ddf"
              }
              target="_blank"
            >
              Vote consciente
            </Link>
            <Link
              href={
                "https://www.notion.so/notioncpe/b8bb7797d91e4530b25b96713fe3a9b9?v=691ba4967d4449c5ad907fdfa39a372d"
              }
              target="_blank"
            >
              Quadro Scrum
            </Link>
            {isCreator && (
              <>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <NameLabel>Nome da tarefa:</NameLabel>
                  <TaskInput
                    type="text"
                    {...register("taskName", { required: true })}
                    placeholder="Update Current Task"
                  />
                  <ButtonTask type="submit">Atualizar Tarefa</ButtonTask>
                </form>
              </>
            )}
          </LeftCards>
          <RightCards>
            {canShow ? (
              <>
                <Text>Média: {avarage}</Text>
                <Text>Mediana: {median}</Text>
                <Text>Moda: {mode}</Text>
              </>
            ) : (
              <>
                <Text>Média: - </Text>
                <Text>Mediana: -</Text>
                <Text>Moda: -</Text>
              </>
            )}
          </RightCards>

          <TheTableContainer>
            <LeftTable>
              {left &&
                left.map((user, index) =>
                  canShow ? (
                    <CardUser name={user.name} num={user.vote} key={index} />
                  ) : (
                    <CardUser
                      name={user.name}
                      num={cardSuits[index % 4]}
                      key={index}
                      hasVoted={user.hasVoted}
                    />
                  )
                )}
            </LeftTable>

            <TopTable>
              {top &&
                top.map((user, index) =>
                  canShow ? (
                    <CardUser name={user.name} num={user.vote} key={index} />
                  ) : (
                    <CardUser
                      name={user.name}
                      num={cardSuits[index % 4]}
                      key={index}
                      hasVoted={user.hasVoted}
                    />
                  )
                )}
            </TopTable>
            <Table currentTask={getRoom?.currentTask} />
            <RightTable>
              {right &&
                right.map((user, index) =>
                  canShow ? (
                    <CardUser name={user.name} num={user.vote} key={index} />
                  ) : (
                    <CardUser
                      name={user.name}
                      num={cardSuits[index % 4]}
                      key={index}
                      hasVoted={user.hasVoted}
                    />
                  )
                )}
            </RightTable>
            <BottomTable>
              {bottom &&
                bottom.map((user, index) =>
                  canShow ? (
                    <CardUser name={user.name} num={user.vote} key={index} />
                  ) : (
                    <CardUser
                      name={user.name}
                      num={cardSuits[index % 4]}
                      key={index}
                      hasVoted={user.hasVoted}
                    />
                  )
                )}
            </BottomTable>
          </TheTableContainer>
        </>
      )}

      <ContainerCards>
        {fibonacci.map((value, index) => (
          <Card
            number={value === 0 ? "💡" : value}
            key={index}
            id="number-card"
            onClickFunction={() => {
              doVote(value);
            }}
          />
        ))}
        {isCreator && (
          <ManageButton
            text={canShowText}
            onClickFunction={() => {
              showVotes({ code: code, state: !canShow });
              setCanShow((prevState) => !prevState);
              setCanShowText(() => (canShow ? "Show" : "Hide"));
            }}
          />
        )}
      </ContainerCards>
    </>
  );
}
