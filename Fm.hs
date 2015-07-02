{-# LANGUAGE OverloadedStrings #-}
module Fm where
import Data.List
import qualified Data.Text     as T
import System.Random
-- import Data.Aeson

toDouble :: Int -> Double
toDouble x = (read (show x)) :: Double

rM :: Int -> IO Int
rM x = getStdRandom (System.Random.randomR ((1,x) :: (Int,Int)))

start :: Int -> Int -> Int -> Int -> IO [Int]
start ax bx cx dx = do
    a <- rM ax
    b <- rM bx
    c <- rM cx
    d <- rM dx
    return [a,b,c,d]

rollFunc :: [String] -> T.Text
rollFunc [a,b,c,d] = T.pack (a ++ "," ++ b ++ "," ++ c ++ "," ++ d)
rollFunc _ = "Problem in rollFunc"


rollT :: Int -> Int -> Int -> Int -> IO T.Text
rollT ax bx cx dx = do
    x <- start ax bx cx dx
    let y = map show x
    return $ rollFunc y

roll :: Int -> Int -> Int -> Int -> IO [Double]
roll ax bx cx dx = do
    x <- start ax bx cx dx
    return $ map toDouble x

computation :: Double -> String -> Double -> Double
computation a b c  | b == "+"   = (+) a c
                   | b == "-"   = (-) a c
                   | b == "*"   = (*) a c
                   | b == "/"   = scoreDiv a c
                   | b == "Concatenate"  = cat a c
                   | otherwise = 5000

fRound :: Double -> Int
fRound = round

notWhole :: Double -> Bool
notWhole x = toDouble (fRound x) /= x

cat :: Double -> Double -> Double
cat l m   | m < 0  = 3.1
          | l == 0  = 3.1
          | notWhole l  = 3.1
          | notWhole m  = 3.1
          | otherwise  = read ((show $ fRound l) ++ (show $ fRound m)) :: Double

g :: (Double -> Double -> Double) -> String
g x         | x 3 2 == 5 = " + "
            | x 3 2 == 1 = " - "
            | x 3 2 == 6 = " * "
            | x 18 3 == 6 = " / "
            | x 5 5 == 55 = " concatenated left of "
            | otherwise = " cow "

f :: Double -> String
f x = show (fRound x)

scoreDiv :: Double -> Double -> Double
scoreDiv az bz  | bz == 0  = 99999
                | otherwise = (/) az bz

ops :: [Double -> Double -> Double]
ops =  [cat, (+), (-), (*), scoreDiv]

calc :: Double -> Double -> Double -> Double -> Double -> [(String, String, String, String, String, String)]
calc a b c d e = [(f a', g op1, f b', g op2, f c', show e) |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- ops,
                            op2 <- ops,
                            op2 (op1 a' b') c' == e]

calc2 :: Double -> Double -> Double -> Double -> Double -> [(String, String, String, String, String, String)]
calc2 a b c d e = [(f a', g op1, f b', g op2, f c', show e) |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- ops,
                            op2 <- ops,
                            op2 a' (op1 b' c') == e]

calc3 :: Double -> Double -> Double -> Double -> Double -> [(String, String, String, String, String, String, String, String)]
calc3 a b c d e = [(f a', g op1, f b', g op3, f c', g op2, f d', show e) |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- ops,
                            op2 <- ops,
                            op3 <- ops,
                            op3 (op1 a' b') (op2 c' d') == e]

calc4 :: Double -> Double -> Double -> Double -> Double ->[(String, String, String, String, String, String, String, String)]
calc4 a b c d e = [(f a', g op1, f b', g op3, f c', g op2, f d', show e) |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- ops,
                            op2 <- ops,
                            op3 <- ops,
                            op3 (op2 (op1 a' b') c') d' == e]

calc5 :: Double
           -> Double
           -> Double
           -> Double
           -> Double
           -> [(String, String, String, String, String, String, String, String)]
calc5 a b c d e = [(f a', g op1, f b', g op3, f c', g op2, f d', show e) |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- ops,
                            op2 <- ops,
                            op3 <- ops,
                            op3 (op2 c' (op1 a' b')) d' == e]

calc6 :: Double
           -> Double
           -> Double
           -> Double
           -> Double
           -> [(String, String, String, String, String, String, String, String)]
calc6 a b c d e = [(f a', g op1, f b', g op3, f c', g op2, f d', show e) |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- ops,
                            op2 <- ops,
                            op3 <- ops,
                            op3 d' (op2 (op1 a' b') c') == e]

calc7 :: Double
           -> Double
           -> Double
           -> Double
           -> Double
           -> [(String, String, String, String, String, String, String, String)]
calc7 a b c d e = [(f a', g op1, f b', g op3, f c', g op2, f d', show e) |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- ops,
                            op2 <- ops,
                            op3 <- ops,
                            op3 d' (op2 c' (op1 a' b')) == e]

h :: (String, String, String, String, String, String) -> String
h (a',b',c',d',e',goal) = "(" ++ a' ++ b' ++ c' ++ ")" ++ d' ++ e' ++ " = " ++ goal ++ "<br />  "

h2 :: (String, String, String, String, String, String) -> String
h2 (a',b',c',d',e', goal) = a' ++ d' ++  "(" ++ c' ++ b' ++ e'++ ") = " ++ goal ++ "<br />  "

h3 :: (String, String, String, String, String, String, String, String) -> String
h3 (a',b',c',d',e',f',g', goal) = "(" ++ a' ++ b' ++ c' ++ ")"  ++ d' ++ "(" ++ e' ++ f' ++
                            g' ++ ") = " ++ goal ++ "<br />  "

h4 :: (String, String, String, String, String, String, String, String) -> String
h4 (a',b',c',d',e',f',g', goal) = "((" ++ a' ++ b' ++ c' ++ ")" ++
    f' ++ e' ++ ")" ++ d' ++ g' ++ ") = " ++ goal ++ "<br />  "

h5 :: (String, String, String, String, String, String, String, String) -> String
h5 (a',b',c',d',e',f',g', goal) = "(" ++ e' ++ f' ++ "(" ++ a' ++
  b' ++ c' ++ "))" ++ d' ++ g' ++ ") = " ++ goal ++ "<br />  "

h6:: (String, String, String, String, String, String, String, String) -> String
h6 (a',b',c',d',e',f',g', goal) = g' ++ d' ++ "((" ++ a' ++ b' ++
  c' ++ ")" ++ f' ++ e' ++ ") = " ++ goal ++ "<br />  "

h7 :: (String, String, String, String, String, String, String, String) -> String
h7 (a',b',c',d',e',f',g', goal) = g' ++ d' ++ "(" ++ e' ++ f' ++
  "(" ++ a' ++ b' ++ c' ++ ")) = " ++ goal ++ "<br />  "

pim ::  [(String, String, String, String, String, String, String, String)] -> [String]
pim x  | null x  = [" -- There are no solutions in this category"]
       | otherwise  = [" "]


pim' ::  [(String, String, String, String, String, String)] -> [String]
pim' x  | null x  = [" -- There are no solutions in this category"]
       | otherwise  = [" "]

ca :: [Double] -> [String]
ca [a, b, c, d, e] = ["Using the result from two numbers left of a third.<br />"] ++
    map h (calc a b c d e) ++
    pim' (calc a b c d e) ++
    ["<br /><br />Using a number left of the result obtained from two other numbers.<br />"] ++
    map h2 (calc2 a b c d e) ++
    pim' (calc2 a b c d e) ++
    ["<br /><br />Using two numbers and then the remaining two numbers - then using those results.<br />"] ++
    map h3 (calc3 a b c d e) ++
    pim (calc3 a b c d e) ++
    ["<br /><br />Using the result from two numbers left of a third - then that result left of the remaining number.<br />"] ++
    map h4 (calc4 a b c d e) ++
    pim (calc4 a b c d e) ++
    ["<br /><br />Using the third number left of the result obtained from the first two - then that result left of the fourth number.<br />"] ++
    map h5 (calc5 a b c d e) ++
    pim (calc5 a b c d e) ++
    ["<br /><br />Using the the remaining number to the left of the result of using the result of two numbers' left of another.<br />"] ++
    map h6 (calc6 a b c d e) ++
    pim (calc6 a b c d e) ++
    ["<br /><br />Using the remaining number to the left of the result from using the a number left of the result from two others.<br />"] ++
    map h7 (calc7 a b c d e) ++
    pim (calc7 a b c d e)
ca _ = ["What?"]

cars :: [Double] -> String
cars [a,b,c,d,e] = concat $ ca [a,b,c,d,e]
cars _ = []

tru :: T.Text -> [Double]
tru x = map read (map T.unpack (T.split (==',') x))

truck :: [Double] -> IO String
truck x = do
    let y = map round x
    let z = show (y !! 0) ++ " " ++ show (y !! 1) ++ " " ++ show (y !! 2) ++ " " ++  show (y !! 3) ++ "<br /><br />"
    let a = (" " ++ z ++ (cars x) ++ "<br />") :: String
    return a

arg :: [Double]
arg = [1,1,1,1,42]

rText :: [Int] -> IO T.Text
rText [a,b,c,d] = do
    x <- roll a b c d
    return $ rollFunc $ map show $ map round x
rText _ = return $ T.pack "String"

xyz :: [Double]
xyz = [1, 1, 1, 1, 20]

main :: IO ()
main = truck [1,1,1,1,20] >>= print

