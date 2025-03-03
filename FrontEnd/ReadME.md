> npx create-next-app@latest store-studyola --ts

#### Need to install the following packages:

#### create-next-app@14.2.5

#### Ok to proceed? (y) y

```bash
> ✔ Would you like to use ESLint? … No / (Yes)
> ✔ Would you like to use Tailwind CSS? … (No) / Yes
> ✔ Would you like to use `src/` directory? … No / (Yes)
> ✔ Would you like to use App Router? (recommended) … No / (Yes)
> ✔ Would you like to customize the default import alias (@/\_)? … No / (Yes)
> ✔ What import alias would you like configured? … @/\_
> Creating a new Next.js app in /Users/jongphilkim/Documents/GitHub/STORE_StudyOLA_FE/store-studyola.
```

> mkdir -p app/{containers,components,layouts,services}
> npm run install

####################################################################################

name: Deploy to EC2

on:
push:
branches: - master

jobs:
deploy:
runs-on: ubuntu-latest
steps: - uses: actions/checkout@v2

      - name: Deploy to EC2
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.EC2_IP }}
          username: ubuntu
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          port: 22
          script: |
            set -e
            echo "Cloning repository..."
            cd /home/ubuntu/StudyOLA_FE_V2/frontend/
            git pull origin master
            echo "Setting Node.js version to 18.19.1..."
            . $HOME/.nvm/nvm.sh
            nvm use 18.19.1
            node -v
            echo "Node.js version set."
            echo "Installing dependencies..."
            cd /home/ubuntu/StudyOLA_FE_V2/frontend
            npm install
            echo "Building application..."
            cd /home/ubuntu/StudyOLA_FE_V2/frontend
            npm run build
            echo "Reloading application with PM2..."
            cd /home/ubuntu/StudyOLA_FE_V2/frontend
            pm2 delete studyola
            pm2 start npm --name studyola --instances 2 -- run start
            echo "Deployment complete."

####################################################################################

=========== 실행하는 부분

```bash
> npm run build
> npm run start
> npm run dev

> pm2 start npm --name studyola --instances 2 -- run start
```

http://localhost:3000/store?paymentType=NORMAL&orderId=studyOla_5_28fd4080-42e&paymentKey=tstud20240814185837XzuO0&amount=6600

const dummyData = [
{ email: "janedoe123@gmail.com", username: "JazzyJane" },
{ email: "johnsmith456@gmail.com", username: "JohnnyBravo" },
{ email: "alicejones789@gmail.com", username: "AllyCat" },
{ email: "bobbrown111@gmail.com", username: "BrownieBob" },
{ email: "charliedavis222@gmail.com", username: "ChillCharlie" },
{ email: "davidjohnson333@gmail.com", username: "DaringDavid" },
{ email: "emmawilson444@gmail.com", username: "EmmyWinks" },
{ email: "frankthompson555@gmail.com", username: "FrankieFunk" },
{ email: "gracemartinez666@gmail.com", username: "GracefulG" },
{ email: "hannahgarcia777@gmail.com", username: "HappyHannah" },
{ email: "ianmiller888@gmail.com", username: "IcyIan" },
{ email: "juliataylor999@gmail.com", username: "JollyJulia" },
{ email: "kevinclark1234@gmail.com", username: "KoolKevin" },
{ email: "lindalewis5678@gmail.com", username: "LuckyLinda" },
{ email: "michaelwalker9012@gmail.com", username: "MightyMike" },
{ email: "ninahall3456@gmail.com", username: "NiftyNina" },
{ email: "oliverallen7890@gmail.com", username: "OllyO" },
{ email: "paulayoung1122@gmail.com", username: "PlayfulPaula" },
{ email: "quincyking3344@gmail.com", username: "QuirkyQuincy" },
{ email: "rachelhernandez5566@gmail.com", username: "RadiantRachel" },
{ email: "samuelharris7788@gmail.com", username: "SassySam" },
{ email: "tinarodriguez9900@gmail.com", username: "TinaTwinkle" },
{ email: "ursulahall1234@gmail.com", username: "UpliftUrsula" },
{ email: "vincentbaker5678@gmail.com", username: "VinnyVibes" },
{ email: "wendymitchell9012@gmail.com", username: "WittyWendy" },
{ email: "xanderperez3456@gmail.com", username: "XanderX" },
{ email: "yasminewhite7890@gmail.com", username: "YazzyY" },
{ email: "zoemorris1234@gmail.com", username: "ZestyZoe" },
{ email: "aarontorres5678@gmail.com", username: "AdventurousAaron" },
{ email: "brendajames9012@gmail.com", username: "BreezyBrenda" },
{ email: "carlbrown3456@gmail.com", username: "CleverCarl" },
{ email: "daniellemartin7890@gmail.com", username: "DazzlingDanielle" },
{ email: "edwardthompson1234@gmail.com", username: "EagerEdward" },
];
