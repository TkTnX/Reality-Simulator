import { Send } from "lucide-react";

export const nodes = [
  {
    id: "1-1",
    type: "input",
    data: {
      label: (
        <div>
          <h1>Введите ваше желание</h1>
          <form className="flex items-center gap-1 bg-gray-50">
            <input type="text" />
            <button>
              <Send />
            </button>
          </form>
        </div>
      ),
    },
    position: { x: 150, y: 0 },
  },
  {
    id: "1-2",
    type: "default",
    data: {
      label: (
        <div>
          <h2>Накопить на первый взнос</h2>
          <p>Возможность: 50%</p>
          <p>Риск: низкий</p>
        </div>
      ),
    },
    position: { x: 0, y: 100 },
  },
  {
    id: "1-3",
    type: "output",
    data: {
      label: (
        <div>
          <h2>Взять кредит</h2>
          <p>Возможность: 50%</p>
          <p>Риск: средний</p>
        </div>
      ),
    },
    position: { x: 300, y: 100 },
  },

  {
    id: "2-3",
    type: "resizer",
    data: {
      label: "Resize Me",
    },
    position: { x: 250, y: 50 },
    style: {
      width: 80,
      height: 80,
    },
    parentId: "2-1",
    extent: "parent",
  },
];

export const edges = [
  {
    id: "e1-2",
    source: "1-1",
    target: "1-2",
    type: "smoothstep",
  },
  {
    id: "e1-3",
    source: "1-1",
    target: "1-3",
    type: "smoothstep",
  },
];
