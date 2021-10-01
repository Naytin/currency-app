import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Button, Col, Row, Statistic, Tooltip} from 'antd'
import {PlusOutlined} from '@ant-design/icons';
import {useTypedSelector} from "../hooks/storeHooks";
import {selectApp, selectPortfolio} from "../store/selectors";
import Loader from "./common/Loader";
import {returnToFixed} from "../services/helpers";

const defaultImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAADlCAMAAAAP8WnWAAAAyVBMVEX///8mJvfw8PDv7+/39/f5+fn+/v7x8fHz8/P19fX8/Pz6+voAAPcjI/cgIPcYGPcUFPf///v29u8LC/f09PD5+fD///nm5v75+f8qKvdJSfh7e/Xq6vDf3/EzM/elpft2dvXZ2fGHh/X19f/r6/6ZmfTd3f6WlvrU1PJGRvg7O/fMzPLAwPKAgPVVVfjGxvK5ufxmZvbCwvxjY/laWvapqfM2NvfY2P5ycvm4uPOcnPSPj/q2tvyVlfRXV/bR0f5ubvmlpfTj4++Hv92YAAAgAElEQVR4nO09aUPqOrClKFVI96QioCDgAgIKioK44f//US+TremmxaPn3vvey5fby2nHTDKZfSaGQUetaprmATw14GkPnvboQ7UBTwfwVIMn+EcLHurwdAhP+/Spug9Ph/BaHZ4sePo3wDX+DZP4f+R+Brkqf7n6xSSq6UlUv5jE34dr1GCYlmUdwmODPlh78NMePDXog3FIH0z4yYDXDuC1OvsAftuH1/bhib1Wh9cO4Mn45+HWjCodJl8OOsSq0SFWjQ62CCY8sdWAhwO+zHSIVaODLe5B4rV/HK75HztHO8A1/w8hV/IwS/JJHGZBPp8xCXpUzN+AWzBf0zig47BORwOe9uBpH5724WkPnhrwdAhP8FBXH+yrD/bUBzmvNQ4OcRD5dOx36NiHpyjAh38O98v5Gmz8GpMwMSbG4PF5s3o9dkNER+hWZu/97dvQIAE2f5f5GL9E7xx6gK+676cUI8917IoYtuMAnvb8/LoaGN+B+2/QUJqLVQV5rsIqOWzHQ+78dvDbyBlfH2b1mimh5x5mQT6mFRhvKzr5AsRiBEN0t6gFVlm42kRKzNdo0LF/uLd3uJd82oOn/eQTfdjby/kg9dreXvTxcorczxGTw0FO/yzaLwWXPu0y3184zKYxnIbeF3uW2D8XvV8Y+D+goVjkpF120+LhorsrYv3bNZSguilCzREjf09d1PsIfhq5nyVLsna8HLIDCeeNWvfz+d1s5DBp52TRC5/ID5PlPgw4qnvqaT/5tFfwtJ95igb3yM4i9tBe3pw1onicvD1PRxTB9B6Go6MoD+5uE4n/0SjHJMqsmknWKYqknOJ4ugBJ5lNmr+Calg9/6mYzRim+46AnYv0bNZQ9q5fcNgcdb66pjlUEFwfk7HycWg903wk+O0f/kIZyMkqcNhfdT6j69TlcKusfVyj5nf34s8j9BFk+JliEi1ZHZeEO+6GOno1uf4wsD2FwYU/HnnoSwl4+qdcaydeEdhDd6iTpoPejCJeFS/nQFOkrg84jCTfxQSMxkRLzBTn353od2aIE03vcRQ8FuEcJNoumwQ/otz8kxKNzDTcHdQvOp4/p8Avg3roaZwl7UdE5+usaypOGmzc6M9KToJa4YQwuHifr9eTtYkhXI8BW2vb7uNOghO0fQe4HNJSlNivU57w/hutTi3Xbbnmgl9AB/xmvnq6twE/CNUlXI03UN35AQ4kdE7V8/0VN+S9q6jXuv+AfkEWMm40WvvigxuBiYq5XLrVYE9qW41JU588dghNw/Ucnfo2Kc/7nlV9Eh1tqvmxZ/sjzhK9i3BznIklq5LoX6lqWrbPUEM0nOEnCg3F88NA6+FNPmULum0K80Ykn7D58+IlJLFpS/6B7RQmSbqDLHSqS94yfE3D96iwWeeiqiPn8LQ0lmqm1dscdrE/ibcSlF9Uww9Z0Ozn7aNZrzY+Tm2V/5gmt0kantzpcC98p7JzTvZ9A7g80lMtQxy0+zMHwjqNGdef+pEm5CsZiEhgHfu3t8oHvqo1aF8RUcE18r7Bz3zlZfl9DsfQIiwmhE+kZhoCJmR9hgQ+MhmnhGxSv88AQr9F/M7Z86i56n2CCrTRcCwfBY5s7Ixy0gWCTgGsYMS2gJbXOG0ZNwU1HhD6fr/VHcs6qHssDZ7tDjSSaXGa5aDo0fLMArm8MXjy2TeFoqMFtjiXPtMMT6x8T4mSqSAjdRGoSxkXFZQS3Gn4Ft9lnxOuEC0PB9U8Uf3XvifkPIYevFVGibaAmQQUfTNg7vSZfwyVnrZAtRJcouMEkhnsb/EMaStCS9OO+E3WYCVNYbDTFuAxcTJ6YYoL6RMkuotiUbXf+NF7xPW4Z3MoFto/rMWCGG9BZabicikHhUhOeyWXzLqM/4JYpUisv56xDxU3QW0wSz4Cbe3qWA9c3mk0jyoHbacHZRZcxqQ2VhAk/rH9AiAdbOQGPqfCcA74x3EYdnIUbrEcIPWyDLFwhutHSV+eoK4G7U/KTyGV0tVzkLKtiSynQZMjRf8XDkP7otqiQyMANlsBnbGo2ZOFaeM6wewukzhopeYBOrNKpGim4PFXDkhkSOakPLFfCUq8dwEPdsoKlXNtwG8nXMEzJoaqK9oGEWxUMHp3hLNwDtne2+4HFB75SD9w+sSwQzLWDxERKzPf73FIurX0aH2aQe7Y9kK8puCal0kcx25DqyiQIcApubUThua+GYhJ3Er7X/OuBkDe5suhW0Tv7DV0bKRLGpDPp9uVknVm73eu1t9WkBWF8QBABbdU5upB/IFz+dSG+ctXGKeSO2fSC5CRq5Po91M1Vx4UR2sMkXK6nooFiEmo1xn+O3OfepLSh2FTr+qwOM4he946kJtF8zw/7OKMUXNL3mCUgDdBHRRsXeQbz1/M1ud9SpFQcHorUh8NDkfpAfxKpD/DEXRLw6Et2YnvMxIfXhgj+90N/rV73j5yiYB268JNw8QPdK/ToAzQ6EX/kSJbip/58ufkyzL+hoZCZ+sOBOMyk7QLnNBLMB1+F2ViV3PM1TsGFM+vMiGASWC2gHfxNDaX2oUjmCguSgJ/geOikZnYqhbhVwglOw527kiFRUrM6Utig6yTz+V0Nxb8N5WEnkt4v6YlBi+QkyOqTADLqWGm4R3SB3Lk8R+RdfO1d/gFyO6dq+D35Z18CiZxtV+yx8EXKD65RIWo2Og+ycOdw6oYCObyWSzhKwS0537zI6t5nYUx4akRS9UJX+/ynaI2Ac0aJD6L32HuEUuN0GWX/gg8c0nuJxG8xXQ4aX0wp9x+/paFYZ2JH7GPu06dWHKx5mGQ+Zic21PuPw+HwhI7hkD18YJzLJKjeY48DsRvRq6OO51/TUBS9uDJgYQEe7jR5PrGyqNENOyBM/WNwrSJlGEwNYFIiwOLJQxf8NQ0l6MsjtxTIMXSpWZdALpBzo2ZLKbgUuQHQ5VPAkVPas3NH/pqbgdw76shxsgymLtXpUzIRfuRUdYNLwQUmQQWo80oEk5CHzq5QSv2ZVI0vGUokXejensiQiKg24a6i1GuSp6KjRim49AkokRqIIvMikkpK+NH4DkPRV62shjKQLLolVw1+8bZpM0buHFWpSmo+VXwTMmVSwJVyEl3k7fKvaCjSGnFXkt6BhVM+kDpHih+c+2XdF1aHiRQJV0Jg/qa/o6FIW867lJN4pusdVtPRUhm5s72jgPJHAdf61DcTjO2Kt5FwpSbkbb+N3K5kKf8kW2FGPlT3ouIpzSQGyvfnLD8si8O1LEz8QrKsBnOHUwSDq5Zx8y2y5CaPSn2o66kPdZX6UFevNQ4Pg64kljWGD+p7wDqcu0h80JAfRHex19+rHMtx2mrfdkgWLvvz0YaCakUc7p6MbLrtSINbdr4sVaOM8afpdcEmZvF81QKKhds20npoLMUBv3g4bhhORaAyoy92gQgEXOtECrr3QHut5Hy/JcQVcuhaTALMO0Y56XM0K7R43PA5DZefI3p8bUecI2X1OHPylzQUpaAo5CBqQLlLFrlhOkVR20mWsFCAXDWN3N23kPuGhqI0jyRy50YOk5gUY8eiA1kmsaD4OB3BARVy98E3UzVqKvWhti9zMHiGxH6tJlMf6ANLqTio1X21cxc+LzXx2c4ReK1Wl68xuGSNim1xtA50uDX4IACp4jY43FpTKZd+Em6Z+capGmax8ZeRRxvBLdGjJAl6ttxNkKtkn40K0bPdjqHDZdlGS9C/agKuFCYsPJ4j5z6fbwq5ckL8UiL3JpED4dTORc7ExvMY3JbxiAmVndOUEAfl0pFwj2Jd6G9pKFsp527lJNouP/MFAYuL7uq1NWqxMRqdqq20K1nkwL6o6GodQy6f+fymhuJ15WGG5X7IaCgxXD+gg9l+URDgK5WwwCJ7SQ2FmlPOSMJdhNoW766hxKLAVKwVnhRrNVO7QQntRhriMi8SAxdANb5qZopl58DF0pThDiYBl+/GsU15IxFwn6TqvcRl4Cbn+y05Z0mliDJoMQn4BcySkj79YCKX5z1IkRr4rd2+gKubu39JiFvS8WMfSzUJftklGqPk14ykkANCDCeEkXAjNvlPMj7O3/KhEBkNRyfiMIP+BRytLHKWWB6nJZEzMA5I0ByC9e7MV9PN0/Pi+urBFjLD+i5yXyii/OWqjtxcWv9rpv3uVUHdtL1U+mIxXHyiqVUC7vW2PXMQjwg5rut5kHgqFtF5JaXgJufLeNTugZAXec43kVB9wPBCN/m+yCxcXzIKxuKN4Kx75yG99DM1uDz8S4EQacpQw8vkq1ajE6NivCgwz3K3GbQGfSBvKp5+axhHL1TIF+tofKwWTQP/FSEem9iIZYkASbAAVoEQv3h8vKbjkY3r63VbadPe0fPsa8xgi5HXu4G07z9ErkSqhooLhs9YIAd06W1zojFk6aTCBKEW+rGL43epYbtovOXlyTumajAtm6U+MC0bUh/og0h9gCf1GkvV8KXqTI1I+o/Q/cKnjM0+9VlKhf5BsPzE6NlxOKHz0vTLz/d7qRo4jlc3xWFmCUXhMsgwn0Iu8Z1he+6TVSphjs33O3KOkoScMnAERu/mvku3rpKRR0fFIbqcubM8b0W+Xk59pB0er0ukOv5Rqoa0V52ZPMw+pGt5m7Q74KIkclATj8ar8+fJxdXJx8fw6GJye94boWyBpI1mXyap/lmqhpozOlKHGSII4HZOIFcvgxxlFt58e23xLWEpT/AUBQRfLVduupielQvtlqpxqFIfmPdPpj4cxqkP9fhJz6MQ7kIf8i+dh8Rr9bo/DXOwSQw3rPTffBJg/um+mgiDG/n+4+Y4XSA5G0Zfz9dQp3+3ZFJm5LARVnlVToAJBEK9FVV9tA/MgzvkeZ6bc3z4pnmQwE4lWDGTMHHgv/WSdfVuOPl6voZ2jowd8i3jjES3/fx8+3x7u765OmMZry8kdT4fu5eXm8v8xAbP2wwNbJU494MXR0fPRpdfzvebyFENXqqHdBHFQN4xI5ktNbbNJFw/IGc5h8/1LptGaU2/eu7q9Z/o/XdSNerXl7N8KmO7cdpedzJwg1l66xzU+0jC/YJJBJ2+7knzWk3/0/nuHFndjxqTtv25Pmi7ofe+oG8mPv04TRb/h6Or6JMYa+5P0dFMIwB3PPB/NFXjqO982eaE/WHkTq+ScBt9XalE5wm4XPNhJEz5psWdSVRRTjOJYKttnns6+HS+uwnxyWspzMT+ofs3HW7zIf7UPb5KKdmUJ5LO43Kzap0eO07ldPTe3958EM6KtXMfnI1jCoAKoh/RUHCwGH/iG88bDhpNfCzhtuKNC+9MnNR8DPOmPxLdikScC3Sx8XRSSyJnYtyLSdMdN38gEILJZFfUOHqta4IZ3LlW93dJrCS5v7U9lCcK6faj1ZsBmRqx6CTb2NJwZ5RlFpFlSYYSnb3moWYLbwcdIKfzKNZB82G0vxfFmoqNniP9L0R7y7GkdgqQw9PAuei424wa2pSiSaj+lNeLChlKhmXnsVZsbjKoMU23Mlr1z7tUhN9uz/urVgXlsVE37PokLiW30TpKsOyuE4oSyRA5o94G4C2fLnstR2rNduie1/UobHAdC3Rel54rCjhFfi7EyfVDSkGk1OLenU+G4B0P+JmnT8QcTs7vc5pGodlWw22iVVYZxuKU74KLnNXyqkqU1z0ge0fPvYookAztZ2hjoQKg1/HeoUfj2xrKIU5tG8XsdHNTjbLMh3m865NpWs+taP1t0DqIJwHVnzBJ2wtXlHP4oIilmNpNz2O7RC2ds0ALjV2rc2fbzW8HQj5miW2jJNJ/pJquWch86D/e9Ir6RyEw1iX5kGePlRGGzstHEVPDpNM9ZtvkhFsSy0SiKhtYcu0nqRrFJg95TKSXO2i8PIj2c0yThM3h+52nSpiDHrr049d87gZzvW4jqif/fAJu5G/51qN5Hav5at0uoKY8z+T5wlglzyihio8X4F8rUYBuBnhZyZhy7jzicMF0b7LKMhu1m4YyggvgBlWuVXrjD6zmS9qS2G2v01BwNWP1cyFOXnRd3rNFUXcpC8IKcDfdlOiUl6DC+cTDY/hHt8KrP79gaha5YoqJ455hZXapSJjMat1JQyH9RC+Qy68nkTKPmsm+ROgKS+aDT5jMRu8WLudoxXjK6kXDK6zi5yeKNFha324aylTv4iF7gWSZTxQQIQ+yVvvbsaZ0vRBJ7hw3Gz0RM8f/L/PEUkyCHRHATs43UA09mKMqo6GwcrgD5eQ80Jyc+r5Rw9f3D6RTln2wBz1GjybLl037fb7qvywnJ5j+IjMvxGvB4bukHWfk10STDL95zHBbKy+uBrfmHz1GIvNCfMDr58gN8CjbHWI530gG8CpoQn9UTln+gZElCXmYyaXeL+PNSLoZcHD49nLvIqYouVwLQ85dlwrUZMBCVcZw0hFMApRoO7wJ0u4LztTGlYFlZsNSZnAF+oEzrlqqpjxUK5etqMxBTtB7oPVw8UaDxCRqgbVeeVTVSrsUqUpWmd7gIA5YxMltbtydhrvE0E2QH1Bcee4Mel7mWCZXrG50HqiacunYh60rraFEcduFSjjncTw1iWHfVr5S6KIKeycRpfrLw1NHBSyIKiYPPyRyvAgbrfPzuSLo+hNOSa4ZEzBHPhxVPl+zKh1VzoyU1lCGmmbaCxJM4qgn28iB7uy2Xle9du9uVlHeYdvz+qK2M+4C4G1kgYX1AZ+jc5LjMqRMgm81eg7yzRi+MFdYzDcueqa/Fadq6KJAEyEVNDV0o7Ij2lcyL/H5G3i2I0JHZAwulqtjrjVTXfHFYixbVrzYXrMhRQwUW7nzguIjuar0hOaKGNYQwmnF85UBendaUs7Fwl80clKT4Nog1fPc6Y1JuH4fd5wn+GpTYbqEHR5PiBamjPOWWeqzbee46c1EoW+luV/NQY6XNGs15bKknC5fKeS0FFcvscKixyO1r2+5Cp8RtlRrXsw4emhVM2KiGSrkTm0WP8+Pwr7HvV5med0AqOiGpBfbbZpivk2pw4a3QQnkVE03FLTrk3gLeS+QGQiGwrsCDONxxtbAOz6SpUaQdieQg4JGt0fyo0d6e7SQFfdnNR8CHJKV9/D5ykwc5y4qgVxc02dXOpZ82aLWNJ8yD5B9qn4tKkwpVlwJkrwEcsDewo90mj5DLnhLuKXRkuQhx3vMhB1p+8VF1x0riRwbSW7px3+CpTxJ7tPmvUD6ZXycgdFOmBPHWJaNwcblZ9Uamaxh+PN50V0G40nOV7U6YJHQLwIhWl+ErrZq73B83MqbUdLHudDcKe40kPKTsmHbrad3g1FP7SHlgHEqg9y25ZgeW9tR81VZLb3kLucgF0sO9147R3P41Zt1UiSsjlt2EsO4RRkkpnHkWG3jZYbUGHLzpL+9whx3edHdYCsKZBly+5Iu7eOvkLOqssbKDuOmSUYPcAtXOLYnlUwkZ7e3j5plqSZRl2qt7VJtkJMlnH40zEUuYTvKVZlGOciZHcrxgEcJpqZy0Y6SyGWsAiKLg1S7DPqPXIlGfZLQ3uGikoMDvKLaM2p9YKW9q4yOZ5nRcUfEBz5dOWceJbV39oG/yMGNMZUM3PoBK0pHTWHFsAwffuj8hFWQsedqUkl0RvFhXnDc5OlPqGptRsXuKHmYmQ9HMmmvy3eZa2PhAucwibM8l0tF2BIZ5gM8L1xj0e/vOc5u/TwQEovdN0XvrIeLt0qRsMlEgdRBWEZvktSUtaMK2wPI/Q6beefotCiu7AzyzqfNcs2EXJaBTUjf/FTOncqNu4+ZBGj21ApJIicajcp8G7Y7gaXLIxVa9joCOUDXuctjEneF5fJuKw+5nluxT4k490R1DLKsXOSE9yuuEH5U3qQu6DvHnTgUTJajOBVGTsJzx6vlh4xwAHKyzMh+kAW5VcRWIZsCcpl74Pig2m22qwYkkaMTiZwikRPrk1QNX+aJOq++8AP6Q97DJVCvkV5uvMcGZ//qhEjHoTJ3KAfhDkmeC/3op1NACpiJHGgZZXJGIDMpnPgcLtEKcD5J1fhQJw7qznlTNbBQwsv4MMedSnKGC73XxOmXVOBtZM0qrHfYMVN2Fy5iJgq7xyTzgRbllO95XQlXq3Qo1lAi+Zb9oFpYXat2GZIkLjPCNjGTHrgI4H3JxMKlrFl9gfoDnO6f1yliJnLwNoXJPGvKB9y+hKvqD7qfCPFIEi8UogvkQBKL4gaBXL/w8HNceoRPQqpF4UJOAipHXjPugLX7+c5Ry/45jVwAxZZzCVdVjmw+SdUYJlNggXxAt6EMTr5mapMuGmjL/RJxzY9MqeA1P+k4Gq52cwMLEjX3pcnJUn4AyFHgzljCVTU/0+JUjUgSkjOTPS8iMH/Qla+91vgqzdAOO+xTrU6cfxqxCsmcBI1ob1uAHkXt/CDKSdqgK2yfRvy3htwUdxUVpmoE0pDztiJgweq26cYlUiqCrha/tvOqq/rsNVnhL3zElGVDnfRTvhljbu0sepQgz+tGrnkEFZKVPQ6XzZJtyjwo1FBwXA0hNH3M9O+3dN7y41QeTvvh/nUG4/U1rq6qhAA3Ru5MTIJUbHbm8zQUM7DS6MGu8RhnkJFzwHht5zCN3B0p0lDiPicPRN4eQZGwH3J8HUONypn3y6e/3Wse0lzkjvOQw4/9Jg8LHS414oRAeDVgnLV2me1XBMjZXyCnkyW+jRVQUZYCSgbYzZmCBf0IxwELxWw3VIMN2rlkeZ4lyw26bAYWg7vkUVS6a073EDI06kati96zPk5qjVP7XiD3kU+W+lGN+rHpIDgAqx0728+wgH25yW5b4w/KQUF1Eg0cupbg7kE4ZRmKPw69ywHLxqCshaJnh875IbCRRnTYdUJ7L9Omh7XfeJAMRS11LypM1ZAV+dToE7ZnG/RTvQBdJpPGyAV6dp0qFYGfzjOi4N2lfz8jCqpULaPn67LJOgdHdPecpyrdSQq3DqihSbbBEtRzOy0J9yJfFOjnyFB9k5RHi9oI4P/IJpNmkYOJ+RI5Zt2pNge3UtiyGWWEOLUWNiFwxstOAL2ZjXozYmgy1Cpej+RUgr1D3ZeEq7XCKNJQBtq6M+TqA8SrPkoiZ0k24zDvS6wUyUlAb4JjK9u+mLuRKXqbTiCZRFA9d1g8rlJNV18Ccqz7hoSrd98oCITElCurpVhx1ZmVDVjkIAemd7K6SilFU6nggiqNTtKKM/2vaJ7P0IOfGoAa93qCCp8p3GDl8eGzhBsrekWpGqpZuPcS8MwL7mRs5GSn12Nu6fvcbKUjbnr5BikVqm3EqzB52C9U08zJevc3cvEpeoQcnrvCoeu1/Zw/zzqEoWuRM6K8yOgKF6RqqM593lbsBoGav4cMSei77Ly/vd1M6Lh5W6hUQdtjJCy98nZFGqvYtuFc5NQrGFhFQLzw8kmiRr+tSeaTOBpwnr2ONFbHkll8JIxVTYhjZRWtsUCOqd4Z5EwNuYrDr8cI9eoqSpVMkWkpA1kgB2wAHE85Gop+q4OrBQff0ueTzxcqrlvCzWBiqXxUcJEPJZAFjdAgjSMHLKn3OXJ5g4oShpxSUSZy55g2N9zLQU7ru60Nrx3lItcMWSxEeL+UyX9HilI19D4nArlX0eekWEPJHc5sAN67QJICdzHvi0Z2Xje3q7apBTzlsI8LCjeYC+VauPbU33E3QSZVQ9Sj6d0yeD1aBN0yNkGmfq5u4bwygXi4LgVR89WKtpRTlkJ0xsopm4DrZ4uawL0IrymnrPgAVt2u+KJ+TikflFcl6ud0UouREzE33gokr8+d9TlyFccDx0BHnkJoEs7d6cAIuEskpxjjJUWY3jT/AhROABvlTtcinIVCXGsFIlIqXkEX/A5yzOtSI6rN4bMMhLAK/vcC5PxxgjDt01q+ecQq/2ELeE92pdGOjGLkYl1QIidagXwDOfCX1YKnOFggQ1istepRAXJXCah6w3kdOQN8dEx95SEs5bXf5CAnmURXk/NcQwFR8J4t1dQ0FEqAiREvfTgwTDXZ8EOQJTuHbOvyqrsCnTCBKPOtdrZxC0PGK2SQW4iNWEMBNJUQj3tYyKw9V/ZbrpoFQvx1232C0YXx9DJX5rj3FBiGrJOAxg0iUAmkCvw42zkA4MYc0z6OJUZCiDNmxn2PjFuqxnC2tsvVtBCXvS68c6GhAI+Fzo6fyDlmiass7iAgZ9IJSVlk7ACDJRLIsYbG4yBHGU7KT2Eo5QT8wSRGa1WMIaOA1LRMkHASOdUfrSeQY+iijEM0jVwyL/JMRSU6WjA+bunDcmzClxwzhpld53KFpwV5nCwpjZtyDLmj+E/gYuRiY30m8yK5ovslcokVVm0pECRoSg3MuVPI8dhDupZHOYb5FxAC3svbOZ5BSkWxRE46M+zTTzKIqFElxZJHRGcYpuhuEpMw83cuttEC5YuFTrKq/JNOB17bF5tjV5pGHlwJWXLsGC7vZGMdgLjw+qqTjfIje+eZTjZsyECIigQNpdPnHThKTkOxfHuOL67S4t5wVVkGkAID/wj3rGIW73staKUaPYHeOCUF9TkrSP16qMrWWEp/rYQZO9FIkIRyVy0kvbPuvCdWSUuck4RqP3NkafsoGDXAxUcsUtsrajHXcuxTKzff0iQbHk/D8m4gJZLcVX5KokJOGXSXEjmgEdVPtRxycULPAN7vKIHYkshVeTwu7JN00ySO3BGC2echx0uC0JbI0DVRXSahQv1T5KRfgM5DZl6Mmd2URs4MTtSZ06pvQB48quzOFrd74lzWpRHfbcAmyVsgZ9OAX6ZR1cxJA+aVAGFb3b7EGn8LqpfWjp6qEfeuq9X21TwGonedDzYepGnW6lqzO7+zlCqP3dr0NzD6MDb9Wdzr5JxlfB+qexvscFCTPfH8Fctreff9erqJHjUe6k3Ra0820WN//pCwbHnvzhfzrdeaciVZein/QPbaq9eTh1l1awrXMhACO+S2k/Ycvgljq9t2IXkbytzZ0G5tPGKopgsAAApkSURBVBH50FJywb1dajcIu4rHa33gpJ3IVCozr7Ad1+94EpOlCubjDDzWr+7zmlXVM9uZywoLptij4YEmj6g8LFOR2yaChHF89VI3kOfICli+leNOSKqmvOiG+WtWoQC4qdZ161idGWaZTypVI/ZjhE3xMssrZdcaKeTwNscfkB6207HSah0QjypLMX2RBdguUxESWBt+H9gcW0qjOlFRk/ClqNwlbjVlBkrRvZWHOWBZt2eyMM/gvf6+HOgGK7hE5rbQEzJQTAJSQFj+pn0ruEpxoRJZn/Kipg2x5HxNK76F7xTn9pRNdtdVsQunFYnuuhjYtnMfxV17o80XYWNW60EU3GgZ77Q78+Ouvf6NwzNvR5MoSjb35d2A+WtR9MbZlBOufTVfKgXi+xOvcW434NRhVpnyYJSIVQN9gt2DLZmP3uQ3d3iVGw3uQA8penNVuVGtBh93Imd6vGwa+UmqpPrcEjnTsxOtBoDEFb7hplxXjUBuNRX48sZ2QNgGn4iSR7NPts52vLCfuMUMVjiOKYOUUsLWMm552Z8TeqvFwA/gLiyOHFV1qdRsvrVFua7nbWUKCIsVbNQKM4uzTM2qcgwwpYu/zPLwocxJIdfoxZ2C4mxy/v/O3RZypBRcAslV7nysYZcoyG324zqF2WZ91uEqASGds8X5vexi46L2INCYmlZoZDNOWaZm1VQpRCqB/MDkCdNT3R3Qubq6uoBx9axiH2f0p6MBZLdpMjGAAITtdvTqmV6yHG3YVhUmLvQdGd3fze9Hx24YimIh22MXy2uyVi8Q41fK5JJlOsgZSeWZcsiG+Efuf0Rd/cqSfcoP6Gj40uRA62h/n/6QjID6J6y0ZRFF2r3c4V3D115rRIOXSlx/badyI+jmbYZR8oNVzKLQZXERfNLcONQMW/culvhcX71N7rIIH92LxoY1I8fpM4A6OaohGzLplA1v/BGknD5vbTe/qivsLSANR1eQOtqZD1eFGfJ5XTXUfTNoEVdY8Jv9bvOE7WCMXDf0ch2tA3CoUK3rUMHgw/FuUm4GIwiun+ZQ7MQ1OSjHQ/bd+XW6q4ZJru1Yznqvu3XVUFtnHx+oIoQD1hIDUvFzNIl1f7rs5AQsgiPYN3ckOGAUX1sM5QkZNwMOiDF4XGxf+u12/3y7ePwISIBTTAIH55ryB4mmu3XVULat1yZym60Oy6NHU0YhmZrVAGejpSa5AS+mc9rBotkLvtccyuHowsgJsOidg/OYxJleku+2asaOF6AMY3V0Ecl/9PlF5uFsGGU+yO3M4Udsid2HgS9/8/d0pdRBm4OoUcQMcn+K9l4STYhme0VdQAq7akTKRrHdQZz6wGvWXff2q0ZIPKVieM8MlJaqsqC7nGqP5dlL9edLNFjCwe2xvjrh/Ku7sCTMxDlSiq6TSJ6eczX+7si3zC+63uAus/jQnB837tM/T6ttdvhwa5RujbUeJYvOp9/r+xXn+Xo97eXghfdSQFOqg3yCHA7Wp/w65pfAUnDJOkclddBpt0liMyYfObhc9znZSMeGuy+/115cu0v7kmiKwQ2rHKt4YfuMBEbBYa4uxyGvRbuJL2PmqoqYWHL3wh70o+OrnFWcDykXDd6mXrKFqWtf6/P9squGfocijrOO0daP73z099vy9vrZskMI5t0v5KWLtYDgGzoPrum3LT+G6z/G/UtOU71WXeS0FxRagNUVjhJuQKLmZFpJ9Y+x0bzpl7jzUcm5xGHWo8LMaRUL22tugFA9Hs1ebhi7iLAIhFwsV6KPjYNG10SH+6jsHqroXj2kzApI2m/1b69g50EUYK49V8/WmxnKdMZh94uUaQGZFeLs5eBZw26bSKkI1pL6qXGDju+mm6ft9umy/z6mJgKfB7XP1gRrcKO3mBdQRRfjy2xlAmjN6PSu13+h8Lrnm/bdaYjCbEspB80HXzKfT5EztW5PcBl2UpNYvCKVBOO4POroqqp4D80WrIeBSlLVu6pAb45Dk5zc5xdeOK6AV9CzmjLYSem2qzkaijjMd1rfoB5OXN2HjaPLcVbP5Zru6ebISMYVgtiw5OVOlPlY5K21ex8xO7S35W6YZ1yl8JbnA2uk6aetoZG4lRoTfNW9s1mHNWqegJkCDdbc+/MLg3J2/fZoo3mv+1Dwgbg9mtJ3K//y3KLhhMdPNX+HW6nlmc921bA6Wgmp4y7Swpa+Vjtan0/vZqPxw3h233555nftJWJudIc0Jd4dHca6OKXvmzkqaMSU3TQXtZ6t3ZpUZ19WQhF/aGUoNmonzpGgd8ra4lgBzha2Y2uqK/Hj5n5C2GJj+HJaojch9BmbXv9Ae/H4ZTw41cjGqyQ5YIm2yJhMjjWm746aeZN47J/mnd+Yaqh4YRarThF/fgGK39TOHd28+zOi/PRlunVf3evaoDcz8jWJIDjbzp2cptTgSUPhq7BYd2/pX8wtYcKWdZ+0UnpDgst1DsbkZJVgh+AJ/2QhgpP1y/sIGnCLDEc6xvPL54sU3E/n+6WbIUFqFpkm1F0XvV+RIO8wp0iCXCfvEbfRpbzboKCztwWWuFEbXrDc1LeLo2YEGlnGzfCTd4RQAZxUWVFr2fmU3ul/m8+jJJd3wkWptuWGqoXNwv0F5Kr+0TgZ1XHCcLUYsJYhmZ2jyx8Mbt9RSjUOR8NyPdm/pIidkGOCGUR53bTARqOibx+e9uHpEJ7oy/20LkHVwNnl5APzK2b28cEBX2v8MbmcJW5b4Ed1Q2efgQtilkp0y2SahCkmYjRMdvklfdqDp4YhX2Ny2fx6vhIuW4MvuY9JrseZ8i9gZKf3/afl5Obi6OjicfL81L8/pSwv0+UzHJe/Z7UcFy7LLbMkkXeOsPGU3g42b9C5BGcLw3xV1w27O7QtLyc/f0KIJ5jEoL2bIihQQ+3Bl5P4deRKtHU8Wu2KnotWZ+RLuNlUjYKLhHTkyrShNFiZhbxmsM6vGeQmPuRK1FXqAxRtkJNpmg1+MqhdNz0hh1/Drak/35C3HPIP2Gu8OZ/6oFZ+vvVdD3NzOy7VgxsumnnqlIdbmkn8pIaSIQmDXG0+13OZpnvcvyL4N87RDwvx9CSomKZ2qpt7dxWwT+S9Pl0YAf4dJrErcmVc2YmqQyoZjNrFctqyWcTJEzlEVCQ4o173uile2xnuTncmfA1XpGo0VIZEQ78IuaFSHxrqtYZ8zY+i6PDjcbHsvmz6/c3l03bxODyMogA3Eh/sClf7YC/5wc5wDXVKv3eY4VIybolTOxybf4FJ7ADX+CV6/61z9Csayn8XuX+afH6NLIsCmsUh04LXdv7g9+H+53ZjJ7i7C/H/zPn89hVt/w3k/hXk81twuYjf25PCXj7twdN+8ukQjmrOB6nX4K3DfwNcwxB7/cN63W/pizvBNX6J3v8V5/N/P3L/KSaxA1yDuSPqyn9R1/0XdeW/qMeOCfVBjv8i77V/EG6J2zq/53mq/vNw/5cL8f/VyP3XmMROcGsywgIBk7zUBwiv5kVYeK7EPry2LzMk8iI3/xzcz1I1viCJkkzin4Sbg9y/+hz9v4byfwK5/wFyDbNYE2RSJQAAAABJRU5ErkJggg=='

const Portfolio = () => {
    const {portfolio} = useTypedSelector(selectPortfolio)
    const {status} = useTypedSelector(selectApp)

    if (status === 'loading') return <Loader/>

    return (
        <section className="portfolio">
            <div className="top-bound"/>
            <div className="portfolio-container">
                <Row gutter={[0, 16]} justify={"space-between"} className="portfolio-overview">
                    {portfolio.map(coin => (
                        <Tooltip key={coin.id} placement="top" color="blue" title="Click to watch more info">
                            <Col span={24}>
                                <Link to={`currency/${coin.name}`} className="portfolio-overview-link">
                                    <div className="portfolio-overview-card">
                                        <Avatar className="portfolio-overview-image"
                                                src={defaultImage}/>
                                        <Statistic prefix={'+'} title={'PROFIT'} value="$0.00"
                                                   className="portfolio-overview-profit"/>
                                        <Statistic prefix={'$'} title={`0 ${coin.symbol}`}
                                                   value={returnToFixed(coin.quote.USD.price, 2)}
                                                   className="portfolio-overview-cost"/>
                                    </div>
                                </Link>
                            </Col>
                        </Tooltip>
                    ))}
                </Row>
                <Row gutter={[0, 16]} className="portfolio-overview">
                    <Col xs={24} sm={24} lg={24} className="portfolio-overview-add">
                        <Link to='/cryptocurrencies'>
                            <Button type="primary" shape="circle" icon={<PlusOutlined/>}/>
                        </Link>
                        <Statistic value="Bitcoin, Cardano, Ethereum" title={'Add tokens'}/>
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default memo(Portfolio);
